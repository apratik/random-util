import { resolveEndpoint } from '../config'; // Adjust the import path as needed

describe('config.js - resolveEndpoint', () => {
  const mockConfig = {
    payments: {
      endpoint: 'https://helix-payments-us-e-1.590291577452.uat.aws.jpmchase.net/api/v2',
      auth: {
        url: 'https://idauatg2.jpmorganchase.com/adfs/oauth2/token',
        grantType: 'password',
        resource: '',
        clientId: '1',
        username: 'username',
        password: 'password'
      }
    },
    cps: {
      endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2'
    },
    bin: {
      endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2'
    }
  };

  const mockAllowedProtocols = ['https:', 's3:'];

  it('should resolve payments endpoint with valid protocol', () => {
    const result = resolveEndpoint(mockConfig, 'payments', mockAllowedProtocols);

    expect(result).toEqual({
      endpoint: 'https://helix-payments-us-e-1.590291577452.uat.aws.jpmchase.net/api/v2',
      url: 'https://helix-payments-us-e-1.590291577452.uat.aws.jpmchase.net/api/v2',
      auth: {
        url: 'https://idauatg2.jpmorganchase.com/adfs/oauth2/token',
        grantType: 'password',
        resource: '',
        clientId: '1',
        username: 'username',
        password: 'password'
      }
    });
  });

  it('should resolve CPS endpoint with valid protocol', () => {
    const result = resolveEndpoint(mockConfig, 'cps', mockAllowedProtocols);

    expect(result).toEqual({
      type: 'aws',
      bucket: 'app-id-106752-dep-id-106753-uu-id-t8891reloco2',
      prefix: '',
      endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2'
    });
  });

  it('should resolve BIN endpoint with valid protocol', () => {
    const result = resolveEndpoint(mockConfig, 'bin', mockAllowedProtocols);

    expect(result).toEqual({
      type: 'aws',
      bucket: 'app-id-106752-dep-id-106753-uu-id-t8891reloco2',
      prefix: '',
      endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2'
    });
  });

  // Add more test cases for other scenarios of resolveEndpoint function as needed
});
