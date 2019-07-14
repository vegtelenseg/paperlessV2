/* tslint:disable no-any */
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
  errorMiddleware,
  retryMiddleware,
  progressMiddleware,
  ConcreteBatch
} from "react-relay-network-modern/lib"; // Changed to /lib to avoid mjs issue that fails the build
import { Variables, CacheConfig } from "relay-runtime";

import { SubscriptionClient } from "subscriptions-transport-ws";
import { constants } from "./constants";

const SHOW_PROGRESS = false;

interface Props {
  token: string;
  logout: () => void;
}

export default ({ token, logout }: Props) => {
  const client = new SubscriptionClient(
    // TODO: remove hack
    `${constants.SERVER_URI}/graphql`.replace("http", "ws"),
    {
      connectionParams: {
        token
      },
      reconnect: true
    }
  );

  const subscribeFn = (
    config: ConcreteBatch,
    variables: Variables,
    _cacheConfig: CacheConfig,
    observer: any
  ) => {
    const result = client

      .request({
        // @ts-ignore
        query: config.text,
        operationName: config.name,
        variables
      })
      // New line for ts-ignore
      .subscribe({
        next(v: any) {
          observer.onNext(v);
        },
        complete() {
          observer.onCompleted();
        },
        error(error: Error) {
          observer.onError(error);
        }
      });

    return {
      dispose() {
        result.unsubscribe();
      }
    };
  };

  const network = new RelayNetworkLayer(
    [
      /*
      cacheMiddleware({
        size: 100, // max 100 requests
        ttl: 900000, // 15 minutes
      }),
      */
      urlMiddleware({
        url: () => Promise.resolve(`${constants.SERVER_URI}/graphql`)
      }),
      // IS_DEV_ENV ? loggerMiddleware() : null,
      process.env.NODE_ENV === "development" ? errorMiddleware() : null,
      // IS_DEV_ENV ? perfMiddleware() : null,
      retryMiddleware({
        fetchTimeout: 15000,
        forceRetry: (cb, delay) => {
          // @ts-ignore
          window.forceRelayRetry = cb;
          // tslint:disable-next-line:no-console
          console.log(
            `call \`forceRelayRetry()\` for immediately retry! Or wait ${delay} ms.`
          );
        },
        statusCodes: [500, 503, 504]
      }),
      authMiddleware({
        token
      }),
      SHOW_PROGRESS
        ? progressMiddleware({
            onProgress: (current, total) => {
              // tslint:disable-next-line:no-console
              console.log(
                `Downloaded: ${current} B, total: ${
                  total ? total.toString() : "0"
                } B`
              );
            }
          })
        : null,

      next => async req => {
        req.fetchOpts.headers.Accept = "application/json";
        req.fetchOpts.headers["Content-Type"] = "application/json";

        // TODO x-Request-ID
        // req.fetchOpts.headers['X-Request-ID'] = uuid.v4(); // add `X-Request-ID` to request headers
        req.fetchOpts.credentials = "same-origin"; // allow to send cookies (sending credentials to same domains)

        try {
          return await next(req);
        } catch (ex) {
          // Logout user out if we get a 401
          if (ex.res && ex.res.status === 401) {
            logout();
          }

          throw ex;
        }
      }
    ],
    {
      subscribeFn,
      noThrow: true
    }
  );

  return network;
};
