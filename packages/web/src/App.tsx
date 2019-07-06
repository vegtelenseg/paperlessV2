import React from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import { DefaultLayout } from "./containers";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

class App extends React.Component {
  private history = createHistory();
  render() {
    return (
      <Router history={this.history}>
        <React.Suspense fallback={loading()}>
          <DefaultLayout />
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
