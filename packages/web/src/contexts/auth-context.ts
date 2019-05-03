import * as React from 'react';

export type AuthContextType =
  | {
      token: string;
      authenticated: true;
      username: string;
    }
  | {
      authenticated: false;
    };

export const AuthContext = React.createContext<AuthContextType>({
  authenticated: false,
});
