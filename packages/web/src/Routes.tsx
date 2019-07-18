import React from "react";
import { Switch, Route } from "react-router-dom";

const Register = React.lazy(() => import("./views/Pages/Register/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500/Page500"));
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Login = React.lazy(() => import("./views/Pages/Login/Login"));
const Students = React.lazy(() => import("./views/Pages/Students/Students"));

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
    path: "/",
    exact: true,
    name: "Dashboard",
    Component: Dashboard
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
    Component: Students
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

export default Routes;
