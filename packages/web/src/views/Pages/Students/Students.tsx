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

interface State {
  selectedIndex: number;
}

const ROWS_PER_PAGE = 4;
class Students extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  public shouldComponentUpdate() {
    return false;
  }
  public gotoPage(index: number) {
    this.setState({
      selectedIndex: index
    });
  }
  public handleSelectedPage = (idx: number) => {
    if (idx === this.state.selectedIndex) {
      return;
    }
    const { hasMore } = this.props.relay;
    if (hasMore()) {
      const { loadMore } = this.props.relay;
      loadMore(ROWS_PER_PAGE, error => {
        if (error) {
          throw Error("Failed to load more: " + error.message);
        }
        this.gotoPage(idx);
      });
    }
  };

  public render() {
    const { students } = this.props;
    if (
      students &&
      students.students &&
      students.students.edges &&
      students.students.total
    ) {
      const totalRecords = students.students.total;
      const totalRecordsPerPage = Math.floor(totalRecords / ROWS_PER_PAGE);
      const pages = new Array(totalRecordsPerPage).fill(null);
      const page = this.state.selectedIndex;
      const studentRows = students.students.edges.slice(
        page * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE + ROWS_PER_PAGE
      );
      console.log("Rows: ", studentRows);
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
                  {studentRows.map((student, idx) => (
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
                {`Showing 1 to ${totalRecordsPerPage} of ${totalRecords} entries`}
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div
                className={`${style.dataTables_paginate} paging_simple_numbers`}
                id="DataTables_Table_0_paginate"
              >
                <ul className={style.pagination}>
                  <li
                    className={`paginate_button page-item previous ${page ===
                      0 && "disabled"}`}
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
                  {pages.map((_nothing, idx) => (
                    <li
                      onClick={() => this.handleSelectedPage(idx)}
                      key={idx}
                      className={`paginate_button page-item ${idx ===
                        this.state.selectedIndex && "active"}`}
                    >
                      <a
                        href="#"
                        aria-controls="DataTables_Table_0"
                        data-dt-idx={idx + 1}
                        className="page-link"
                      >
                        {idx + 1}
                      </a>
                    </li>
                  ))}
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
          total
          pageInfo {
            hasNextPage
          }
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
        count: ROWS_PER_PAGE
      }}
      container={StudentsPaginationContainer}
      {...moduleProps}
    />
  );
};
