import { discoverConfig, resolveEndpoint } from '../config'; // Adjust the import path as needed

describe('config.js', () => {
  describe('discoverConfig', () => {
    it('should load config from existing file', () => {
      // Mock the existence of a config file
      jest.spyOn(require('fs'), 'existsSync').mockReturnValueOnce(true);
      
      // Mock the content of the config file
      jest.spyOn(require('fs'), 'readFileSync').mockReturnValueOnce(`
        [payments]
        endpoint = "https://example.com"
        auth = {}

        [cps]
        endpoint = "http://cps.example.com"
        auth = {}
      `);
      
      const config = discoverConfig();
      
      expect(config).toEqual({
        payments: {
          endpoint: 'https://example.com',
          auth: {}
        },
        cps: {
          endpoint: 'http://cps.example.com',
          auth: {}
        },
        endpoint: null,
        auth: {},
        certfile: null,
        keyfile: null,
        httpsEnabled: false,
        port: 3000
      });
    });
    
    // Add more test cases for different scenarios of discoverConfig if needed
  });

  describe('resolveEndpoint', () => {
    it('should resolve endpoint with valid protocol', () => {
      const mockConfig = {
        endpoint: 'https://example.com',
      };
      const mockPath = 'payments';
      const mockAllowedProtocols = ['https:'];

      const result = resolveEndpoint(mockConfig, mockPath, mockAllowedProtocols);

      expect(result).toEqual({
        endpoint: 'https://example.com',
        url: 'https://example.com',
        auth: {},
      });
    });

    it('should throw error for invalid protocol', () => {
      const mockConfig = {
        endpoint: 'ftp://example.com',
      };
      const mockPath = 'payments';
      const mockAllowedProtocols = ['https:'];

      expect(() => {
        resolveEndpoint(mockConfig, mockPath, mockAllowedProtocols);
      }).toThrowError('Invalid protocol for endpoint "payments". Valid options: https:');
    });

    it('should resolve local endpoint', () => {
      const mockConfig = {
        endpoint: 'file://path/to/local/file',
      };
      const mockPath = 'payments';
      const mockAllowedProtocols = ['https:', 'file:'];

      const result = resolveEndpoint(mockConfig, mockPath, mockAllowedProtocols);

      expect(result).toEqual({
        type: 'local',
        prefix: 'path/to/local/file',
        endpoint: 'file://path/to/local/file',
      });
    });

    it('should resolve AWS S3 endpoint', () => {
      const mockConfig = {
        endpoint: 's3://example-bucket/path/to/file',
      };
      const mockPath = 'payments';
      const mockAllowedProtocols = ['https:', 'file:', 's3:'];

      const result = resolveEndpoint(mockConfig, mockPath, mockAllowedProtocols);

      expect(result).toEqual({
        type: 'aws',
        bucket: 'example-bucket',
        prefix: 'path/to/file',
        endpoint: 's3://example-bucket/path/to/file',
      });
    });

    it('should resolve endpoint with empty protocol', () => {
      const mockConfig = {
        endpoint: '',
      };
      const mockPath = 'payments';
      const mockAllowedProtocols = ['https:', 'file:', 's3:'];

      const result = resolveEndpoint(mockConfig, mockPath, mockAllowedProtocols);

      expect(result).toEqual({
        type: 'none',
        prefix: '',
        endpoint: '',
      });
    });

    // Add more test cases for resolveEndpoint function as needed
  });
});
