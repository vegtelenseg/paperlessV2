import React from "react";
import { Table } from "reactstrap";

import { RouteComponentProps } from "react-router";

const tableHeadings = [
  "First Name",
  "Last Name",
  "Grade",
  "Physics",
  "Mathematics"
];
interface Props extends Partial<RouteComponentProps> {
  id: string;
  name: string;
  registeredDate: string;
}

class School extends React.Component<Props> {
  public render() {
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

export default School;
