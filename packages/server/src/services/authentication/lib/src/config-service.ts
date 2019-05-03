/* @flow */
import getMetaTagContent from './get-meta';

const {NODE_ENV, REACT_APP_SERVER_URI = 'http://localhost:5000'} = process.env;

let serverUri: string | null;

if (NODE_ENV === 'development') {
  serverUri = REACT_APP_SERVER_URI;
} else {
  serverUri = getMetaTagContent('app:server-uri');
}

/*
 * Retrieve the server uri from the app:server-uri meta tag when in prod mode
 * in dev mode use the REACT_APP_SERVER_URI variable
 */
export default class ConfigService {
  static get serverUri(): string | null {
    if (serverUri != null) {
      // strip trailing slash
      return serverUri.replace(/\/$/, '');
    } else {
      return serverUri;
    }
  }

  /**
   * Should be one of production,development,testing,staging etc.
   */
  static get stage(): string {
    if (NODE_ENV === 'development') {
      return 'development';
    } else {
      return getMetaTagContent('app:stage') || 'production';
    }
  }
}
