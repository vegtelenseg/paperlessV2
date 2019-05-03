/* tslint:disable no-any */
import {
  RelayNetworkLayer,
  urlMiddleware,
  SubscribeFunction,
  authMiddleware,
  errorMiddleware,
  retryMiddleware,
  progressMiddleware,
  ConcreteBatch,
} from 'react-relay-network-modern/lib'; // Changed to /lib to avoid mjs issue that fails the build
import {
  Environment,
  RecordSource,
  Store,
  Variables,
  CacheConfig,
} from 'relay-runtime';

import {IS_DEV_ENV, ConfigService} from '@stackworx/react';

const SHOW_PROGRESS = false;

type HandleLogoutFn = () => void;
type GetAuthTokenFn = () => string;

function createNetworkLayer(
  handleLogout: HandleLogoutFn,
  getAuthTokenFn: GetAuthTokenFn
) {
  const network = new RelayNetworkLayer([
    /*
      cacheMiddleware({
        size: 100, // max 100 requests
        ttl: 900000, // 15 minutes
      }),
      */
    urlMiddleware({
      url: () => Promise.resolve(`${ConfigService.serverUri}/graphql`),
    }),
    // IS_DEV_ENV ? loggerMiddleware() : null,
    IS_DEV_ENV ? errorMiddleware() : null,
    // IS_DEV_ENV ? perfMiddleware() : null,
    retryMiddleware({
      fetchTimeout: 15000,
      retryDelays: (attempt) => 2 ** (attempt + 4) * 100, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
      forceRetry: (cb, delay) => {
        // @ts-ignore
        window.forceRelayRetry = cb;
        // tslint:disable-next-line:no-console
        console.log(
          `call \`forceRelayRetry()\` for immediately retry! Or wait ${delay} ms.`
        );
      },
      statusCodes: [500, 503, 504],
    }),
    authMiddleware({
      token: getAuthTokenFn,
    }),
    SHOW_PROGRESS
      ? progressMiddleware({
          onProgress: (current, total) => {
            // tslint:disable-next-line:no-console
            console.log(
              `Downloaded: ${current} B, total: ${
                total ? total.toString() : '0'
              } B`
            );
          },
        })
      : null,

    (next) => async (req) => {
      req.fetchOpts.headers.Accept = 'application/json';
      req.fetchOpts.headers['Content-Type'] = 'application/json';

      // TODO x-Request-ID
      // req.fetchOpts.headers['X-Request-ID'] = uuid.v4(); // add `X-Request-ID` to request headers
      req.fetchOpts.credentials = 'same-origin'; // allow to send cookies (sending credentials to same domains)

      try {
        return await next(req);
      } catch (ex) {
        // Logout user out if we get a 401
        if (ex.res && ex.res.status === 401) {
          handleLogout();
        }

        throw ex;
      }
    },
  ]);

  return network;
}

export default function createEnv(
  handleLogout: HandleLogoutFn,
  getAuthTokenFn: GetAuthTokenFn
) {
  const handlerProvider = undefined;

  const network = createNetworkLayer(handleLogout, getAuthTokenFn);

  const source = new RecordSource();
  const relayStore = new Store(source);

  return new Environment({
    handlerProvider,
    network,
    store: relayStore,
  });
}
