import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Student_student } from "./__generated__/Student_student.graphql";

interface Props extends RouteComponentProps {
  student: Student_student;
}
class Student extends React.Component<Props> {
  public render() {
    const { student } = this.props;
    console.log("Stuident: ", student);
    const results = student.studentResults;
    return (
      <tr
        key={`${student.firstName}`}
        onClick={() =>
          this.props.history.push(
            `${this.props.location.pathname}/${student.id}`
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
                src={`https://coreui.io/demo/img/avatars/${(1 % 8) + 1}.jpg`}
              />
            </div>
          </td>
          <td>
            <div>
              {student.firstName} {student.lastName}
            </div>
            <div className="small text-muted">
              <span>New</span> | Registered:
              {student.dateEnrolled}
            </div>
          </td>
          <td>
            <div className="medium text-muted">{student.grade}</div>
          </td>
          {results!.map((result: any, idx) => {
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
  }
}

const StudentFragmentContainer = createFragmentContainer(withRouter(Student), {
  student: graphql`
    fragment Student_student on Student {
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
  `
});

export default StudentFragmentContainer;
