import "react-app-polyfill/ie9"; // For IE 9-11 support
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "react-widgets/dist/css/react-widgets.css";
import * as serviceWorker from "./serviceWorker";


import AuthPersistGate from './components/AuthPersisteGate';
import { AuthContextType } from './contexts/AuthContext';



ReactDOM.render(
  <AuthPersistGate>
    {(auth: AuthContextType) => <App auth={auth} />}
  </AuthPersistGate>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// TODO change this for the project to work offline
serviceWorker.unregister();
