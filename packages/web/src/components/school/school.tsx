import React from "react";
import {
  Col,
  Card,
  CardBody,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import gql from 'graphql-tag';

interface School {
  name: string;
  registeredDate: string;
  __typename: string;
}

interface Props {
  school: School;
}

class School extends React.Component<Props> {
  static fragments = {
    schools: gql`
      fragment school on School {
          name
          registeredDate
      }
    `
  }
  public render() {
    return (
      <Col xs="12" sm="6" lg="3" onClick={() => alert()}  >
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
            <div className="text-value">{this.props.school.name}</div>
            <div>{this.props.school.registeredDate}</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: "70px" }}></div>
        </Card>
      </Col>
    );
  }
}

export default School;
