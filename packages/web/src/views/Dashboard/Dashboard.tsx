import React from "react";
import { Row } from "reactstrap";

import Schools from "../Pages/Schools/Schools";
import { RouteComponentProps } from "react-router";
import RelayRenderer from "../../RelayRenderer";
import { graphql } from "babel-plugin-relay/macro";
import { createRefetchContainer, RelayRefetchProp } from "react-relay";
import { Dashboard_viewer } from "./__generated__/Dashboard_viewer.graphql";

interface State {
  dropdownOpen: boolean;
  radioSelected: number;
}

interface Props extends RouteComponentProps {
  viewer: Dashboard_viewer;
  relay: RelayRefetchProp;
}

class Dashboard extends React.Component<Props, State> {
  render() {
    if (this.props.viewer) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Schools schools={this.props.viewer} {...this.props} />
          </Row>
        </div>
      );
    }
  }
}

const query = graphql`
  query DashboardQuery($count: Int!, $cursor: String) {
    viewer {
      ...Dashboard_viewer
    }
  }
`;

const DashboardFragmentContainer = createRefetchContainer(
  Dashboard,
  {
    viewer: graphql`
      fragment Dashboard_viewer on Viewer {
        ...Schools_schools @arguments(count: $count, cursor: $cursor)
      }
    `
  },
  query
);

export default props => (
  <RelayRenderer
    query={query}
    variables={{
      count: 10
    }}
    container={DashboardFragmentContainer}
    {...props}
  />
);
