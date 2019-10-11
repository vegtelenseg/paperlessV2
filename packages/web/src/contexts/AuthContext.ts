import * as React from "react";

// TODO: this component is incomplete because it is not integrated with local storage

export type AuthContextType =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      username: string;
      token: string;
    };

const state: AuthContextType = {
  authenticated: false
};

export default React.createContext<AuthContextType>(state);
