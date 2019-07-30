import React from "react";

import { RouteComponentProps, withRouter } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import Student from "./component/Student";
import { createPaginationContainer, RelayPaginationProp } from "react-relay";

const tableHeadings = [
  "avatar",
  "First Name",
  "Grade",
  "English (%)",
  "Mathematics (%)"
];
interface Props extends RouteComponentProps {
  node: any;
  relay: RelayPaginationProp;
}

class Students extends React.Component<Props> {
  public render() {
    const {
      node: { students }
    } = this.props;
    console.log("Students: ", this.props);
    return (
      <div className="card">
        <div className="card-body">
          <h2>{this.props.node.name}</h2>
          <span className="small text-muted">
            Registered: {this.props.node.registeredDate}
          </span>
          <br />
          <br />
          <table className="table table-responsive-sm table-hover table-outline mb-0">
            <thead className="thead-light">
              <tr>
                {tableHeadings.map(tableHeading => {
                  if (tableHeading === "avatar") {
                    return (
                      <th className="text-center" key={tableHeading}>
                        <i className="icon-people"></i>
                      </th>
                    );
                  }
                  return <th key={tableHeading}>{tableHeading}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <Student student={students as any} />;
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const query = graphql`
  query StudentsQuery($id: ID!, $count: Int!, $cursor: String) {
    node(id: $id) {
      ... on School {
        name
        registeredDate
        ...Students_students @arguments(count: $count, cursor: $cursor)
      }
    }
  }
`;

const StudentsPaginationContainer = createPaginationContainer(
  withRouter(Students),
  {
    students: graphql`
      fragment Students_students on School
        @argumentDefinitions(
          count: { type: "Int" }
          cursor: { type: "String" }
        ) {
        id
        name
        registeredDate
        students(first: $count, after: $cursor)
          @connection(key: "Students_students") {
          edges {
            node {
              ...Student_student
            }
          }
        }
      }
    `
  },
  {
    direction: "forward",
    query,
    getVariables(_props, { count, cursor }, _fragmentVariables) {
      return {
        count,
        cursor
      };
    }
  }
);
export default moduleProps => {
  return (
    <RelayRenderer
      query={query}
      variables={{
        id: moduleProps.id,
        count: 4
      }}
      container={StudentsPaginationContainer}
      {...moduleProps}
    />
  );
};
