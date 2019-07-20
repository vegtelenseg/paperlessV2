import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import { withRouter, RouteComponentProps } from "react-router";
import { Card, CardHeader, CardBody } from "reactstrap";
import Radar from "react-chartjs-2";

interface Props extends RouteComponentProps {
  node: any;
}

class Drilldown extends React.Component<Props> {
  public render() {
    const radar = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running"
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };
    console.log("Drilldown:Props: ", this.props);
    const { firstName, lastName, grade } = this.props.node;
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
              Mathematics
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody className="card-body">
              <div className="chart-wrapper">
                <Radar data={radar} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              English
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody className="card-body">
              <div className="chart-wrapper">
                <Radar
                  options={{
                    responsive: false
                  }}
                  data={radar}
                />
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
        results {
          score
          assessment {
            kind
            chapters {
              name
              maxScore
            }
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
