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
import graphql from "babel-plugin-relay/macro";
import { RouteComponentProps } from "react-router";
import { createFragmentContainer } from "react-relay";
import { school_viewer } from "./__generated__/school_viewer.graphql";

interface Props extends Partial<RouteComponentProps> {
  viewer: school_viewer;
}

class School extends React.Component<Props> {
  public render() {
    console.log("School:Props: ", this.props.viewer.name);
    const { viewer } = this.props;

    return (
      <Col xs="12" sm="6" lg="3">
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
            <div className="text-value">{viewer.name}</div>
            <div>{viewer.name}</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: "70px" }}></div>
        </Card>
      </Col>
    );
  }
}

const SchoolFragmentContainer = createFragmentContainer(School, {
  viewer: graphql`
    fragment school_viewer on School {
      name
      registeredDate
    }
  `
});
export { SchoolFragmentContainer };
