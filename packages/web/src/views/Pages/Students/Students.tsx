import React from "react";

import { RouteComponentProps, withRouter } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";

const tableHeadings = [
  "avatar",
  "First Name",
  "Grade",
  "English (%)",
  "Mathematics (%)"
];
interface Props extends RouteComponentProps {
  node: any;
}

class Students extends React.Component<Props> {
  public render() {
    const {
      node: { students }
    } = this.props;
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
              {students.edges.map((student, idx) => {
                const results = student.node.studentResults;
                return (
                  <tr
                    key={`${student.node.firstName}${idx}`}
                    onClick={() =>
                      this.props.history.push(
                        `${this.props.location.pathname}/${student.node.id}`
                      )
                    }
                    className="card-header-action"
                  >
                    <>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            className="img-avatar sm"
                            // There is only 8 sample avatars
                            src={`https://coreui.io/demo/img/avatars/${(idx %
                              8) +
                              1}.jpg`}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          {student.node.firstName} {student.node.lastName}
                        </div>
                        <div className="small text-muted">
                          <span>New</span> | Registered:
                          {student.node.dateEnrolled}
                        </div>
                      </td>
                      <td>
                        <div className="medium text-muted">
                          {student.node.grade}
                        </div>
                      </td>
                      {results.map((result: any, idx) => {
                        const { score } = result;
                        const status =
                          score <= 36
                            ? "bg-danger"
                            : score > 33 && score <= 59
                            ? "bg-warning"
                            : "bg-success";

                        return (
                          <td key={`${result}-${idx}`}>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>{score + "%"}</strong>
                              </div>
                              {/* <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div> */}
                            </div>
                            <div className="progress progress-xs">
                              <div
                                className={`progress-bar ${status}`}
                                role="progressbar"
                                style={{
                                  width: score + "%"
                                }}
                                aria-valuenow={score}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                          </td>
                        );
                      })}
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const query = graphql`
  query StudentsQuery($id: ID!) {
    node(id: $id) {
      ... on School {
        name
        registeredDate
        students {
          edges {
            node {
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
      container={withRouter(Students)}
      {...moduleProps}
    />
  );
};
