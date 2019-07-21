import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import { withRouter, RouteComponentProps } from "react-router";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Radar } from "./components/Radar";
interface Props extends RouteComponentProps {
  node: any;
}

// interface Dataset {
//   backgroundColor: Color,
//   borderColor: Color,
//   pointBackgroundColor: Color,
//   pointBorderColor: Color,
//   pointHoverBackgroundColor: Color,
//   pointHoverBorderColor: Color,
//   data: number[]
// }

// interface RadarDataset {
//   label: string;
//   datasets: Dataset[];
// }
// interface StudentResults {
//   labels: string[];
//   databases: RadarDataset[]
// }

class Drilldown extends React.Component<Props> {
  public renderRadarData(drilldown: any, subjectName: string) {
    console.log("Student Result: ", subjectName);
    return {
      labels: drilldown.map(drilldown => drilldown.name),
      datasets: [
        {
          label: subjectName,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: drilldown.map(drilldown => drilldown.sum)
        }
      ]
    };
  }
  public render() {
    const { firstName, lastName, grade, studentResults } = this.props.node;
    const mathData = this.renderRadarData(
      studentResults[0].drilldown,
      studentResults[0].subject
    );
    const englishData = this.renderRadarData(
      studentResults[1].drilldown,
      studentResults[1].subject
    );
    return (
      <div className="animated fadeIn">
        <div className="">
          <h2>
            {firstName} {lastName}
          </h2>
          <h4 className="small text-muted">Grade: {grade}</h4>
        </div>
        <div className="card-columns cols-2">
          <Card>
            <CardHeader className="card-header">
              English
            </CardHeader>
            <CardBody className="card-body">
              <div className="chart-wrapper">
                <Radar type="radar" data={englishData} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Mathematics
            </CardHeader>
            <CardBody className="card-body">
              <div className="chart-wrapper">
                <Radar type="radar" data={mathData} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const DrilldownFragmentContainer = createFragmentContainer(
  withRouter(Drilldown),
  {
    viewer: graphql`
      fragment Drilldown_viewer on Student {
        firstName
      }
    `
  }
);

const query = graphql`
  query DrilldownQuery($id: ID!) {
    node(id: $id) {
      ... on Student {
        firstName
        lastName
        grade
        studentResults {
          score
          subject
          drilldown {
            name
            subjectName
            sum
          }
        }
      }
    }
  }
`;

export default moduleProps => {
  console.log("Module Props: ", moduleProps.studentId);
  return (
    <RelayRenderer
      query={query}
      variables={{ id: moduleProps.studentId }}
      container={DrilldownFragmentContainer as any}
    />
  );
};
