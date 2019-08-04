import React from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col
} from "reactstrap";
import { RouteComponentProps, withRouter } from "react-router";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { School_school } from "./__generated__/School_school.graphql";

interface Props extends RouteComponentProps {
  school: School_school;
}

class School extends React.Component<Props> {
  public render() {
    const { school } = this.props;
    console.log("School:props: ", this.props.school.id);
    return (
      <Col
        xs="12"
        sm="6"
        lg="3"
        onClick={() => this.props.history.push(`/school/${school.id}`)}
      >
        <Card className="text-white bg-info">
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <ButtonDropdown
                id="card1"
                isOpen={false}
                toggle={() => {
                  this.setState({ card1: false });
                }}
              >
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem disabled>Disabled action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <div className="text-value">{school.name}</div>
            <div>{school.registeredDate}</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: "70px" }}></div>
        </Card>
      </Col>
    );
  }
}

const SchoolFragmentContainer = createFragmentContainer(withRouter(School), {
  school: graphql`
    fragment School_school on School {
      id
      name
      registeredDate
      ...Students_students
    }
  `
});
export default SchoolFragmentContainer;
