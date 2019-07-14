import React from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { DefaultLayout } from "./containers";
import { RelayContext } from "./contexts/Relay";
import createNetworkLayer from "./createNetworkLayer";
import { RecordSource, Store, Environment } from "relay-runtime";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

interface State {
  environment: Environment;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      environment: this.createEnvironment(undefined)
    };
  }
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
            <DefaultLayout />
          </React.Suspense>
        </Router>
      </RelayContext.Provider>
    );
  }
}

export default App;
