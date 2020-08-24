import { Environment } from '@cx/shared/types';

export const environment: Environment = {
  production: true,
  apiProtocol: location.protocol,
  apiHost: location.host,
};
