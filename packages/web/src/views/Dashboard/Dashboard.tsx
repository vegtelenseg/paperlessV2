import React from "react";
import { Row } from "reactstrap";

import { SchoolFragmentContainer } from "../../components/school/school";
import { RouteComponentProps } from "react-router";
import RelayRenderer from "../../RelayRenderer";
import { graphql } from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Dashboard_viewer } from "./__generated__/Dashboard_viewer.graphql";

interface State {
  dropdownOpen: boolean;
  radioSelected: number;
  card1: boolean;
  card2: boolean;
  card3: boolean;
  card4: boolean;
}

interface Props extends RouteComponentProps {
  viewer: Dashboard_viewer;
}

class Dashboard extends React.Component<Props, State> {
  render() {
    console.log("Dashboard:Props: ", this.props.viewer);
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
      ...Dashboard_viewer
    }
  }
`;

const DashboardFragmentContainer = createFragmentContainer(Dashboard, {
  viewer: graphql`
    fragment Dashboard_viewer on Viewer {
      schools {
        ...school_viewer
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
