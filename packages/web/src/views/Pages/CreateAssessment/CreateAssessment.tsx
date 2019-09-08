import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import { CreateAssessment_viewer } from "./__generated__/CreateAssessment_viewer.graphql";
import { withRouter, RouteComponentProps } from "react-router";
import AssessmentForm, { Grade } from "./components/AssessmentForm";

export interface School {
  name: string;
  id: string;
}

interface Props extends RouteComponentProps {
  viewer: CreateAssessment_viewer;
}

interface State {
  school: School;
  grade: Grade;
}

class CreateAssessment extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      school: null as any,
      grade: null as any
    };
  }
  public setSelectedSchool = (school: School) => {
    if (school) {
      this.setState({
        school
      });
    }
  };

  public setSelectedGrade = (grade: Grade) => {
    this.setState({
      grade
    });
  };

  public render() {
    const { viewer } = this.props;
    if (viewer) {
      return (
        <>
          <AssessmentForm
            schools={viewer as any}
            assessments={viewer.assessments as any}
            selectedSchool={this.state.school}
            selectedGrade={this.state.grade}
            setSelectedGrade={this.setSelectedGrade}
            setSelectedSchool={this.setSelectedSchool}
          />
        </>
      );
    }
  }
}

const CreateAssessmentFragmentContainer = createFragmentContainer(
  withRouter(CreateAssessment),
  {
    viewer: graphql`
      fragment CreateAssessment_viewer on Viewer {
        assessments {
          kind
          chapters {
            name
          }
        }
        ...AssessmentForm_schools
      }
    `
  }
);

const query = graphql`
  query CreateAssessmentQuery {
    viewer {
      ...CreateAssessment_viewer
    }
  }
`;

export default () => {
  return (
    <RelayRenderer
      query={query}
      variables={{}}
      container={CreateAssessmentFragmentContainer as any}
    />
  );
};
