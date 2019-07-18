import React from "react";
import graphql from "babel-plugin-relay/macro";
import { RouteComponentProps } from "react-router";
import { createFragmentContainer } from "react-relay";
import { Schools_viewer } from "./__generated__/schools_viewer.graphql";
import School from "./components/School/School";

interface Props extends RouteComponentProps {
  viewer: Schools_viewer;
}

class Schools extends React.Component<Props> {
  public render() {
    const {
      viewer: { schools }
    } = this.props;
    if (schools && schools.edges) {
      return schools.edges.map((school, idx) => (
        <School key={`${school}-${idx}`} school={school as any} />
      ));
    } else {
      return <div>Loading...</div>;
    }
  }
}

const SchoolFragmentContainer = createFragmentContainer(Schools, {
  viewer: graphql`
    fragment Schools_viewer on Viewer {
      schools {
        edges {
          node {
            id
            name
            registeredDate
          }
        }
      }
    }
  `
});

export default  SchoolFragmentContainer;
