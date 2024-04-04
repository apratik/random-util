
import { resolveEndpoint } from '../config'; // Adjust the import path as needed

describe('config.js - resolveEndpoint', () => {
  it('should resolve endpoint with valid protocol', () => {
    const mockConfig = {
      payments: {
        endpoint: 'https://helix-payments-us-e-1.590291577452.uat.aws.jpmchase.net/api/v2',
        auth: {
          url: 'https://idauatg2.jpmorganchase.com/adfs/oauth2/token',
          grantType: 'password',
          resource: '',
          clientId: '1',
          username: 'username',
          password: 'password',
        }
      },
      cps: {
        endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2',
      },
      bin: {
        endpoint: 's3://app-id-106752-dep-id-106753-uu-id-t8891reloco2',
      }
    };
    const mockPath = 'payments';
    const mockAllowedProtocols = ['https:', 's3:'];

    const result = resolveEndpoint(mockConfig, mockPath, mock
