import React from "react";
import { Table } from "reactstrap";

import { RouteComponentProps } from "react-router";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";

const tableHeadings = [
  "First Name",
  "Last Name",
  "Grade",
  "Physics",
  "Mathematics"
];
interface Props extends Partial<RouteComponentProps> {
  node: any;
}

class Students extends React.Component<Props> {
  public render() {
    console.log("Students:Props: ", this.props);
    const {
      node: { students }
    } = this.props;
    return (
      <>
        <h2>{this.props.node.name}</h2>
        <span>{""}</span>
        <br />
        <br />
        <Table className="table">
          <thead>
            <tr>
              {tableHeadings.map(tableHeading => (
                <th key={tableHeading}>{tableHeading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.edges.map((student, idx) => (
              <tr
                key={`${student.node.firstName}${idx}`}
                onClick={() => console.log("Clicked: ")}
              >
                <>
                  <td>{student.node.firstName}</td>
                  <td>{student.node.lastName}</td>
                  <td>{student.node.grade}</td>
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}

const StudentFragmentContainer = createFragmentContainer(Students, {
  viewer: graphql`
    fragment Students_viewer on Student {
      firstName
      lastName
    }
  `
});

const query = graphql`
  query StudentsQuery($id: ID!) {
    node(id: $id) {
      ... on School {
        name
        students {
          edges {
            node {
              firstName
              lastName
              grade
            }
          }
        }
      }
    }
  }
`;

export default moduleProps => {
  return (
    <RelayRenderer
      query={query}
      variables={{
        id: moduleProps.id
      }}
      container={StudentFragmentContainer}
      {...moduleProps}
    />
  );
};
