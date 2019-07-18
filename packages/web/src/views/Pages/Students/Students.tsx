import React from "react";
import { Table } from "reactstrap";

import { RouteComponentProps } from "react-router";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Students_viewer } from "./__generated__/Students_viewer.graphql";

const tableHeadings = [
  "First Name",
  "Last Name",
  "Grade",
  "Physics",
  "Mathematics"
];
interface Props extends Partial<RouteComponentProps> {
  viewer: Students_viewer;
}

class Students extends React.Component<Props> {
  public render() {
    console.log(this.props.viewer);
    return (
      <>
        <h2>{""}</h2>
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
            {/* {students.map((student, idx) => (
                    <tr
                      key={`${student.firstName}${idx}`}
                      onClick={() => console.log("Clicked: ")}
                    >
                      <>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.grade}</td>
                      </>
                    </tr>
                  ))} */}
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
    }
  `
});
export default StudentFragmentContainer;
