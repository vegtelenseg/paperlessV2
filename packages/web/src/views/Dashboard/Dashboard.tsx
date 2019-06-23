import React from "react";
import { Row } from "reactstrap";
import gql from "graphql-tag";

import School from "../../components/school/school";
import ApolloQuery from '../ApolloQuery';

interface State {
  dropdownOpen: boolean;
  radioSelected: number;
  card1: boolean;
  card2: boolean;
  card3: boolean;
  card4: boolean;
}

interface Props {
  data: any;
}

const DashboardQuery = gql`
    {
      viewer {
      schools {
        ...school
        }
      }
    },
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
          return (
            <div className="animated fadeIn">
                <Row>
              {data.viewer.schools.map((school, idx) => (
                  <School key={`${school} ${idx}`} school={school} />
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
