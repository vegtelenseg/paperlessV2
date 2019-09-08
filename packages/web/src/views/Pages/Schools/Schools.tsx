import React from "react";
import graphql from "babel-plugin-relay/macro";
import { RouteComponentProps } from "react-router";
import { createFragmentContainer } from "react-relay";
import { Schools_schools } from "./__generated__/schools_schools.graphql";
import School from "./components/School/School";

interface Props extends RouteComponentProps {
  schools: Schools_schools;
}

class Schools extends React.Component<Props> {
  public render() {
    const {
      schools: { schools }
    } = this.props;
    if (schools && schools.edges) {
      return schools.edges.map((school, idx) => (
        <School key={`${school}-${idx}`} school={school!.node as any} />
      ));
    } else {
      return <div>Loading...</div>;
    }
  }
}

const SchoolFragmentContainer = createFragmentContainer(Schools, {
  schools: graphql`
    fragment Schools_schools on Viewer
      @argumentDefinitions(count: { type: "Int" }, cursor: { type: "String" }) {
      schools(first: $count, after: $cursor)
        @connection(key: "Schools_schools") {
        edges {
          node {
            id
            name
            registeredDate
            ...School_school
          }
        }
      }
    }
  `
});

export default SchoolFragmentContainer;
