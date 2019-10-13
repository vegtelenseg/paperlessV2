import React from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { DefaultLayout } from "./containers";
import RelayContext, { RelayState } from "./contexts/RelayContext";
import createNetworkLayer from "./createNetworkLayer";
import { RecordSource, Store, Environment } from "relay-runtime";
import { Login } from "./views";
import { AuthContextType } from "./contexts/AuthContext";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

interface Props {
  auth: AuthContextType;
}

interface State {
  auth: AuthContextType;
  environment: RelayState;
  loading: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      auth: props.auth,
      environment: this.createEnvironment(
        props.auth.authenticated ? props.auth.token : ""
      )
    };
  }

  public handleLogin = async ({
    username,
    token
  }: {
    username: string;
    token: string;
  }) => {
    // store.dispatch({
    //   payload: { username, token },
    //   type: 'LOGIN',
    // });

    return new Promise(resolve => {
      this.setState(
        {
          auth: { authenticated: true, token, username }
        },
        () => {
          // this.saveAuth();
          this.setState({ environment: this.createEnvironment(token) });
          resolve();
        }
      );
    });
  };

  // TODO: Pass auth token here and handle logging out
  private createEnvironment(token) {
    const handlerProvider = undefined;

    const network = createNetworkLayer({
      logout: () => {
        //this.handleLogout();
      },
      token
    });

    const source = new RecordSource();
    const relayStore = new Store(source);

    return new Environment({
      handlerProvider,
      // @ts-ignore
      network,
      store: relayStore
    });
  }

  private history = createHistory();

  render() {
    const { environment } = this.state;
    return (
      <RelayContext.Provider value={environment}>
        <Router history={this.history}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                render={props => <Login environment={environment} {...props} />}
              />
            </Switch>
            <DefaultLayout />
          </React.Suspense>
        </Router>
      </RelayContext.Provider>
    );
  }
}

export default App;
