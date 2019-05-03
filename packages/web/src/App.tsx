import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  RouteComponentProps,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import Login from './modules/login/login';
import {
  RelayContext,
  AuthContext,
  AuthContextType,
  RelayContextType,
} from './contexts';
import Dashboard from './modules/dashboard/dashboard';
import createRelayEnv from './create-relay-env';
import LoginService from './services/login-service';

function PrivateRoute({
  // tslint:disable-next-line
  component: Component,
  ...rest
}: RouteProps) {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Route
          {...rest}
          render={(props) =>
            auth.authenticated ? (
              // @ts-ignore
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {from: props.location},
                }}
              />
            )
          }
        />
      )}
    </AuthContext.Consumer>
  );
}

interface State {
  auth: AuthContextType;
  loading: boolean;
  environment: RelayContextType;
}

const loginService = new LoginService('http://localhost:5000');

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      auth: {authenticated: false},
      loading: true,
      // TODO clear environment on log out
      environment: createRelayEnv(this.handleLogout, () => {
        const {auth} = this.state;

        if (auth.authenticated) {
          return auth.token;
        } else {
          return '';
        }
      }),
    };
  }

  public handleLogout = () => {
    //    delete bugsnag.user;
    localStorage.removeItem('auth');
    this.setState({auth: {authenticated: false}});
  };

  public handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    const res = await loginService.login(email, password);
    // bugsnag.user = {
    //   username: email,
    //   email,
    // };

    const auth: AuthContextType = {
      authenticated: true,
      token: res.access_token,
      username: email,
    };

    this.setState(
      {
        auth,
      },
      () => {
        localStorage.setItem('auth', JSON.stringify(auth));
      }
    );
  };

  render() {
    const {auth, loading, environment} = this.state;
    return (
      <div className="App">
        <AuthContext.Provider value={auth}>
          <RelayContext.Provider value={environment}>
            <Router>
              <div>
                <Dashboard handleLogout={this.handleLogout}>
                  <Switch>
                    <PrivateRoute
                      path="/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route
                      path="/login"
                      extact
                      component={(props: RouteComponentProps) => (
                        <Login {...props} handleSubmit={this.handleSubmit} />
                      )}
                    />
                  </Switch>
                </Dashboard>
              </div>
            </Router>
          </RelayContext.Provider>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
