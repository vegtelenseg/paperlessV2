import * as React from "react";
import { QueryRenderer } from "react-relay";
import { GraphQLTaggedNode, Variables, Environment } from "relay-runtime";

import ErrorView from "./components/error/Error";
import { RelayContext } from "./contexts/Relay";

export interface EnvironmentProp {
  environment: Environment;
}

interface Props<T> {
  container: React.ComponentType<T>;
  // tslint:disable-next-line no-any
  renderLoading?: () => React.ReactElement<any>;
  variables?: Variables;
  query: GraphQLTaggedNode;
  // Pass through props
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export default function RelayRenderer<T extends EnvironmentProp>({
  query,
  container: Container,
  renderLoading,
  variables,
  ...moduleProps
}: Props<T>) {
  const combinedVariables = {
    ...variables,
    ...(moduleProps.match ? moduleProps.match.params : null)
  };
  return (
    <RelayContext.Consumer>
      {environment =>
        environment && (
          <QueryRenderer
            environment={environment}
            query={query}
            variables={combinedVariables}
            render={({ error, props, retry }) => {
              if (error) {
                return <ErrorView error={error} retry={retry} />;
              } else if (props) {
                return (
                  // @ts-ignore
                  <Container
                    environment={environment}
                    {...moduleProps}
                    {...props}
                  />
                );
              }
              if (renderLoading) {
                return renderLoading();
              }
            }}
          />
        )
      }
    </RelayContext.Consumer>
  );
}

interface RenderProps<T> {
  container: React.ComponentType<T>;
  query: GraphQLTaggedNode;
  variables?: Variables;
  // tslint:disable-next-line no-any
  renderLoading?: () => React.ReactElement<any>;
}

export function createRenderer<T extends EnvironmentProp>({
  container,
  query,
  variables
}: RenderProps<T>): React.ComponentType<Exclude<T, "environment">> {
  // tslint:disable-next-line no-any
  return (props: T) => (
    <RelayRenderer
      variables={variables}
      {...props}
      // Don't allow overriding container or query
      container={container}
      query={query}
    />
  );
}
