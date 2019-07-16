import React from "react";
import { Switch, Route } from "react-router-dom";
import { RelayContext } from "./contexts/Relay";
import { QueryRenderer } from "react-relay";
import Error from "./components/error/Error";
import graphql from "babel-plugin-relay/macro";

const Register = React.lazy(() => import("./views/Pages/Register/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500/Page500"));
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Login = React.lazy(() => import("./views/Pages/Login/Login"));
const School = React.lazy(() => import("./views/Pages/School/School"));

export const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    Component: Login
  },
  {
    path: "/register",
    exact: true,
    name: "Register",
    Component: Register
  },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    Component: Dashboard
  },
  {
    path: "/500",
    exact: true,
    name: "500",
    Component: Page500
  },
  {
    path: "/404",
    exact: true,
    name: "404",
    Component: Page404
  },
  {
    path: "/school/:id",
    exact: true,
    name: "School",
    Component: School
  }
];
class Routes extends React.Component {
  public render() {
    return (
      <Switch>
        {routes.map((route, idx) => {
          const { exact, path, Component } = route;
          return (
            <Route
              key={idx}
              exact={exact}
              path={path}
              render={props => {
                const transformedProps = Object.assign(
                  {},
                  props,
                  props.match.params
                );
                return <Component {...transformedProps} key={idx} />;
              }}
            />
          );
        })}
      </Switch>
    );
  }
}

const query = graphql`
  query RoutesQuery {
    viewer {
      schools {
        edges {
          node {
            ...school_viewer
          }
        }
      }
    }
  }
`;
export default moduleProps => {
  return (
    <RelayContext.Consumer>
      {environment => (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={{}}
          render={({ error, props, retry }) => {
            if (error) {
              return <Error error={error} retry={retry} />;
            } else if (props) {
              return (
                <Routes environment={environment} {...moduleProps} {...props} />
              );
            }

            return <div>Loading...</div>;
          }}
        />
      )}
    </RelayContext.Consumer>
  );
};
