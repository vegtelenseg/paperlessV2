import React from "react";
import Modal from "../../../components/modal/modal";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import { CreateAssessment_viewer } from "./__generated__/CreateAssessment_viewer.graphql";
import { modal_schools } from "../../../components/modal/__generated__/modal_schools.graphql";

export interface School {
  name: string;
  id: string;
}

export interface Grade {
  name: string;
}

interface Props {
  viewer: CreateAssessment_viewer;
}

interface State {
  school: School;
  grades: Grade[];
}

class CreateAssessment extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      school: null as any,
      grades: null as any
    };
  }
  public setSelectedSchool = (school: School) => {
    if (school) {
      this.setState({
        school: school
      });
    }
  };

  public setSelectedGrades = (
    selectedSchool: School,
    schools: modal_schools
  ) => {
    const school = schools.schools!.edges!.find(school => {
      return (
        school!.node!.id !==
        (selectedSchool ? selectedSchool.id : "U2Nob29sOjE5")
      );
    });
    // @ts-ignore
    const grades = school!.node.grades;
    this.setState({
      grades: grades as Grade[]
    });
  };

  public onClose = () => {
    alert("Close clicked");
    return null;
  };
  public onSubmit = () => {
    alert("Submit clicked");
    return null;
  };
  public render() {
    const { viewer } = this.props;
    if (viewer) {
      return (
        <>
          <Modal
            onClose={() => this.onClose()}
            onSubmit={() => this.onSubmit()}
            schools={viewer as any}
            selectedSchool={this.state.school}
            selectedGrades={this.state.grades}
            setSelectedGrades={this.setSelectedGrades}
            setSelectedSchool={this.setSelectedSchool}
          />
        </>
      );
    }
  }
}

const CreateAssessmentFragmentContainer = createFragmentContainer(
  CreateAssessment,
  {
    viewer: graphql`
      fragment CreateAssessment_viewer on Viewer {
        assessments {
          kind
          chapters {
            name
          }
        }

        ...modal_schools
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
