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
import { School_viewer } from "./__generated__/School_viewer.graphql";

interface Props extends RouteComponentProps {
  school: School_viewer;
}

class School extends React.Component<Props> {
  public render() {
    const {
      // @ts-ignore
      school: { node }
    } = this.props;
    console.log("School:props: ", this.props);
    return (
      <Col
        xs="12"
        sm="6"
        lg="3"
        onClick={() => this.props.history.push(`/school/${node.id}`)}
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
            <div className="text-value">{node.name}</div>
            <div>{node.registeredDate}</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: "70px" }}></div>
        </Card>
      </Col>
    );
  }
}

const SchoolFragmentContainer = createFragmentContainer(School, {
  viewer: graphql`
    fragment School_viewer on School {
      id
      name
      registeredDate
    }
  `
});
export default withRouter(SchoolFragmentContainer);
