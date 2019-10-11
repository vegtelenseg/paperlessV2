import { Redirect, Route, RouteProps } from 'react-router-dom';
import AuthContext from './src/contexts/AuthContext';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';


interface PrivateRouteProps extends RouteProps {
  // Roles required to view screen
  roles?: string[];
  viewer: PrivateRoute_viewer;
  className?: string[];
}

const PrivateRoute = ({
  component: Container,
  viewer,
  roles,
  className,
  ...rest
}: PrivateRouteProps) => (
  <AuthContext.Consumer>
    {auth => (
      <Route
        {...rest}
        render={props => {
          if (auth.authenticated) {
            if (roles) {
              const hasRole: boolean =
                viewer && viewer.user
                  ? !!viewer.user.roles.find(
                      ({ name }) => roles.indexOf(name) !== -1
                    )
                  : false;

              if (!hasRole) {
                console.log('user has no role')
                // return (
                //   <ErrorDisplay
                //     errorText="Access Denied"
                //     className={className}
                //   />
                // );
              }
            }

            return Container && <Container {...props} />;
          }

          // tslint:disable-next-line no-console
          // console.log('Not authenticated, redirecting to Login');
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }}
      />
    )}
  </AuthContext.Consumer>
);

export default createFragmentContainer(PrivateRoute, {
  viewer: graphql`
    fragment PrivateRoute_viewer on Viewer {
      user {
        roles {
          name
        }
      }
    }
  `,
});