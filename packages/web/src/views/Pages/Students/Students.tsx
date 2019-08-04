import React from "react";

import { RouteComponentProps, withRouter } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import Student from "./component/Student";
import { createPaginationContainer, RelayPaginationProp } from "react-relay";
import { Students_students } from "./__generated__/Students_students.graphql";
import style from "./Students.module.css";

const tableHeadings = [
  "avatar",
  "First Name",
  "Grade",
  "English (%)",
  "Mathematics (%)"
];
interface Props extends RouteComponentProps {
  students: Students_students;
  relay: RelayPaginationProp;
}

class Students extends React.Component<Props> {
  public render() {
    const { students } = this.props;
    if (students && students.students && students.students.edges) {
      return (
        <>
          <div className="row">
            <div className="card-body">
              <h2>{students.name}</h2>
              <span className="small text-muted">
                Registered: {students.registeredDate}
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
                  {students.students.edges.map((student, idx) => (
                    <Student
                      index={idx}
                      key={idx}
                      student={student!.node as any}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div
                className="dataTables_info"
                id="DataTables_Table_0_info"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 10 of 32 entries
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div
                className={`${style.dataTables_paginate} paging_simple_numbers`}
                id="DataTables_Table_0_paginate"
              >
                <ul className={style.pagination}>
                  <li
                    className="paginate_button page-item previous disabled"
                    id="DataTables_Table_0_previous"
                  >
                    <a
                      href="#"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx="0"
                      className="page-link"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="paginate_button page-item active">
                    <a
                      href="#"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx="1"
                      className="page-link"
                    >
                      1
                    </a>
                  </li>
                  <li className="paginate_button page-item ">
                    <a
                      href="#"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx="2"
                      className="page-link"
                    >
                      2
                    </a>
                  </li>
                  <li
                    className="paginate_button page-item next"
                    id="DataTables_Table_0_next"
                  >
                    <a
                      href="#"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx="5"
                      className="page-link"
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const query = graphql`
  query StudentsQuery($id: ID!, $count: Int!, $cursor: String) {
    students: node(id: $id) {
      ...Students_students @arguments(count: $count, cursor: $cursor)
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
              id
              firstName
              lastName
              grade
              dateEnrolled
              studentResults {
                score
                subject
              }
            }
          }
        }
      }
    `
  },
  {
    direction: "forward",
    query,
    getVariables(props, { count, cursor }, _fragmentVariables) {
      return {
        count,
        cursor,
        ...props
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
