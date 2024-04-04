import fs from 'fs';
import { discoverConfig } from '../config';

describe('discoverConfig', () => {
    let mockFsReadFileSync;

    beforeEach(() => {
        mockFsReadFileSync = jest.spyOn(fs, 'readFileSync');
    });

    afterEach(() => {
        mockFsReadFileSync.mockRestore();
    });

    // Test case for valid configuration file content
    it('should return the correct configuration', () => {
        jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

        // Read valid TOML content from external file
        const validConfig = fs.readFileSync('path/to/valid-config.toml', 'utf-8');

        // Mock the fs.readFileSync function to return the content of valid-config.toml
        mockFsReadFileSync.mockReturnValueOnce(validConfig);

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
});
