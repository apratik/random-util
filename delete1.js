import { discoverConfig } from '../config'; // Assuming the file containing discoverConfig is located at '../config'

describe('discoverConfig', () => {
  let mockFsReadFileSync;

  beforeEach(() => {
    // Mock the fs.readFileSync function to return mock TOML content
    mockFsReadFileSync = jest.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    // Restore the original implementation of fs.readFileSync after each test
    mockFsReadFileSync.mockRestore();
  });

  // Test case for successful configuration discovery
  it('should successfully discover the configuration', () => {
    // Mock the fs.existsSync function to return true
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    // Mock the fs.readFileSync function to return mock TOML content
    const mockConfig = `
      [payments]
      endpoint = "https://example.com/payments"
      auth = { username = "user", password = "pass" }

      [cps]
      endpoint = "s3://example-bucket/cps"
    `;
    mockFsReadFileSync.mockReturnValueOnce(mockConfig);

    // Call the function under test
    const config = discoverConfig();

    // Assert the expected configuration properties
    expect(config).toBeDefined();
    expect(config.payments.endpoint).toEqual('https://example.com/payments');
    expect(config.payments.auth.username).toEqual('user');
    expect(config.payments.auth.password).toEqual('pass');
    expect(config.cps.endpoint).toEqual('s3://example-bucket/cps');
    // Add more assertions for other configuration properties
  });

  // Test case for configuration file not found
  it('should throw an error if the configuration file is not found', () => {
    // Mock the fs.existsSync function to return false
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    // Call the function under test and expect it to throw an error
    expect(discoverConfig).toThrow('datalink config is not found');
  });

  // Test case for invalid configuration file content
  it('should throw an error if the configuration file content is invalid', () => {
    // Mock the fs.existsSync function to return true
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    // Mock the fs.readFileSync function to return invalid TOML content
    const invalidConfig = 'invalid TOML content';
    mockFsReadFileSync.mockReturnValueOnce(invalidConfig);

    // Call the function under test and expect it to throw an error
    expect(discoverConfig).toThrow('Unexpected token');
  });
});
