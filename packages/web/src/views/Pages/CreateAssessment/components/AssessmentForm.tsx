import React from "react";
import { School } from "../CreateAssessment";
import Combobox from "react-widgets/lib/Combobox";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import find from "lodash/find";

import { AssessmentForm_schools } from "./__generated__/AssessmentForm_schools.graphql";

interface Subject {
  name: string;
  id: string;
}

interface Chapter {
  name: string;
}

export interface Grade {
  name: string;
  subjects?: Subject[];
}

interface Assessment {
  kind: string;
  chapters: Chapter[];
}

interface DataNode {
  school: School;
  grades: Grade[];
}

// interface Subject {
//   name: string;
// }

interface Props {
  schools: AssessmentForm_schools;
  selectedSchool: School;
  selectedGrade: Grade;
  assessments: Assessment[];
  setSelectedSchool: (school: School) => void;
  setSelectedGrade: (grade: Grade) => void;
}

class AssessmentForm extends React.Component<Props> {
  public render() {
    const {
      schools: { schools },
      selectedSchool,
      assessments,
      selectedGrade,
      setSelectedGrade,
      setSelectedSchool
    } = this.props;
    if (schools && schools.edges && schools.edges) {
      // @ts-ignore
      const schoolList = schools.edges.map(({ node }: DataNode) => node);
      const schoolGrades = find(schoolList, [
        "id",
        selectedSchool && selectedSchool.id
      ]);
      const gradeSubjects = find(schoolGrades ? schoolGrades.grades : [], [
        "name",
        selectedGrade && selectedGrade.name
      ]);
      return (
        <form>
          <div className="form-group">
            <label className="col-form-label">School:</label>
            <Combobox
              textField="name"
              valueField="id"
              onSelect={(school: School) => setSelectedSchool(school)}
              data={schoolList}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Grade:</label>
            <Combobox
              valueField="name"
              onSelect={(grade: Grade) => setSelectedGrade(grade)}
              textField="name"
              data={schoolGrades ? schoolGrades.grades : []}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Subjects:</label>
            <Combobox
              valueField="name"
              onSelect={(grade: Grade) => setSelectedGrade(grade)}
              textField="name"
              data={gradeSubjects ? gradeSubjects.subjects : []}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Assessment Kind</label>
            <select className="form-control" id="exampleFormControlSelect1">
              {assessments &&
                assessments.map(assessment => (
                  <option>{assessment.kind}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">
              Example multiple select
            </label>
            <select
              multiple
              className="form-control"
              id="exampleFormControlSelect2"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
        </form>
      );
    }
  }
}

const AssessmentFormFragmentContainer = createFragmentContainer(
  AssessmentForm,
  {
    schools: graphql`
      fragment AssessmentForm_schools on Viewer {
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
                }
              }
            }
          }
        }
      }
    `
  }
);
export default AssessmentFormFragmentContainer;
