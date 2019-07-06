import React from "react";
import { Row, Col } from "reactstrap";
import gql from "graphql-tag";

import School from "../../components/school/school";
import ApolloQuery from "../ApolloQuery";
import { RouteComponentProps } from "react-router";

interface State {
  dropdownOpen: boolean;
  radioSelected: number;
  card1: boolean;
  card2: boolean;
  card3: boolean;
  card4: boolean;
}

interface Props extends RouteComponentProps {
  data?: any;
}

const DashboardQuery = gql`
  {
    viewer {
      schools {
        ...schools
      }
    }
  }
  ${School.fragments.schools}
`;

class Dashboard extends React.Component<Props, State> {
  render() {
    return (
      <ApolloQuery query={DashboardQuery}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...</div>;
          } else if (error) {
            return <div>Error: {error.message}</div>;
          }
          console.log("Data: ", data);
          return (
            <div className="animated fadeIn">
              <Row>
                {data.viewer.schools.map((school, idx) => (
                  <Col
                    xs="12"
                    sm="6"
                    lg="3"
                    onClick={() => this.props.history.push("/students")}
                    key={`${school} ${idx}`}
                  >
                    <School school={school} />
                  </Col>
                ))}
              </Row>
            </div>
          );
        }}
      </ApolloQuery>
    );
  }
}

export default Dashboard;
