import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import RelayRenderer from "../../../RelayRenderer";
import { CreateAssessment_viewer } from "./__generated__/CreateAssessment_viewer.graphql";
import { withRouter, RouteComponentProps } from "react-router";
import find from "lodash/find";
import Combobox from "react-widgets/lib/Combobox";
import Multiselect from "react-widgets/lib/Multiselect";

export interface School {
  name: string;
  id: string;
}

export interface Subject {
  name: string;
  id: string;
  chapters?: Chapter[];
}

export interface Chapter {
  name: string;
}

export interface Grade {
  name: string;
  subjects?: Subject[];
}

interface DataNode {
  school: School;
  grades: Grade[];
}
interface Props extends RouteComponentProps {
  viewer: CreateAssessment_viewer;
}

interface State {
  school: School;
  grade: Grade;
  subject: Subject;
  chapters: Chapter[];
  selectedChapters: Chapter[];
  selectedAssessmentKind: any;
}

class CreateAssessment extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      school: null as any,
      grade: null as any,
      subject: null as any,
      chapters: null as any,
      selectedChapters: null as any,
      selectedAssessmentKind: null as any
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

  public setSelectedSubject = (subject: Subject) => {
    this.setState(prevState => {
      if (prevState.subject && prevState.subject.name === subject.name) {
        return { ...prevState };
      } else
        return {
          subject,
          selectedChapters: []
        };
    });
  };

  public setSelectedChapters = (chapters: Chapter[]) => {
    this.setState({
      selectedChapters: chapters
    });
  };

  public setSelectedAssessmentKind = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      selectedAssessmentKind: e.target.value
    });
  };
  public render() {
    const {
      school,
      grade,
      subject,
      selectedChapters,
      selectedAssessmentKind
    } = this.state;
    const { viewer } = this.props;
    const { schools, assessments } = viewer;
    if (schools && schools.edges && schools.edges) {
      // @ts-ignore
      const schoolList = schools.edges.map(({ node }: DataNode) => node);
      const schoolGrades = find(schoolList, ["id", school && school.id]);
      const gradeSubjects = find(schoolGrades ? schoolGrades.grades : [], [
        "name",
        grade && grade.name
      ]);
      return (
        <form>
          <div className="form-group">
            <label className="col-form-label">School:</label>
            <Combobox
              textField="name"
              valueField="id"
              suggest
              onChange={(school: School) => this.setSelectedSchool(school)}
              data={schoolList}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Grade:</label>
            <Combobox
              valueField="name"
              onChange={(grade: Grade) => this.setSelectedGrade(grade)}
              textField="name"
              suggest
              data={schoolGrades ? schoolGrades.grades : []}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Subjects:</label>
            <Combobox
              valueField="name"
              onChange={(subject: Subject) => this.setSelectedSubject(subject)}
              textField="name"
              suggest
              data={gradeSubjects ? gradeSubjects.subjects : []}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Assessment Kind</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={assessmentKind =>
                this.setSelectedAssessmentKind(assessmentKind)
              }
              value={selectedAssessmentKind ? selectedAssessmentKind : ""}
            >
              {assessments &&
                assessments.map((assessment: any) => (
                  <option key={assessment.kind}>{assessment.kind}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="col-form-label">Chapters:</label>
            <Multiselect
              data={(subject && subject.chapters) || []}
              textField="name"
              value={selectedChapters}
              filter="contains"
              onChange={(chapters: Chapter[]) =>
                this.setSelectedChapters(Array.from(chapters) as Chapter[])
              }
              caseSensitive={false}
              minLength={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <input
            disabled={
              !school || !grade || !subject || selectedChapters.length <= 0
            }
            className="float-right btn btn-primary shadow-md"
            type="submit"
            value="Create Assessment"
          />
        </form>
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
        schools {
          edges {
            node {
              name
              id
              grades {
                name
                subjects {
                  id
                  name
                  chapters {
                    name
                  }
                }
              }
            }
          }
        }
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
