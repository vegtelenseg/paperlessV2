import React from "react";
import { Row } from "reactstrap";

import { SchoolFragmentContainer } from "../../components/school/school";
import { RouteComponentProps } from "react-router";
import RelayRenderer from "../../RelayRenderer";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

interface State {
  dropdownOpen: boolean;
  radioSelected: number;
}

interface Props extends RouteComponentProps {
  viewer: any;
}

class Dashboard extends React.Component<Props, State> {
  render() {
    console.log("Dashboard:Props: ", this.props);
    return (
      <div className="animated fadeIn">
        <Row>
          <SchoolFragmentContainer viewer={this.props.viewer.schools} />
        </Row>
      </div>
    );
  }
}

const query = graphql`
  query DashboardQuery {
    viewer {
      provinces {
        name
      }
      ...Dashboard_viewer
    }
  }
`;

const DashboardFragmentContainer = createFragmentContainer(Dashboard, {
  viewer: graphql`
    fragment Dashboard_viewer on Viewer {
      schools {
        edges {
          node {
            ...school_viewer
          }
        }
      }
    }
  `
});

export default props => (
  <RelayRenderer
    query={query}
    variables={{}}
    container={DashboardFragmentContainer}
    {...props}
  />
);
