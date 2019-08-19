import React from "react";
import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Combobox from "react-widgets/lib/Combobox";
import { modal_schools } from "./__generated__/modal_schools.graphql";
import {
  School,
  Grade
} from "../../views/Pages/CreateAssessment/CreateAssessment";

interface Props {
  onClose: () => null;
  onSubmit: () => null;
  schools: modal_schools;
  setSelectedSchool: (school: School) => void;
  setSelectedGrades: (selectedSchool: School, schools: modal_schools) => void;
  selectedSchool: School;
  selectedGrades: Grade[];
}

class Modal extends React.PureComponent<Props> {
  public hasSchools(schools: modal_schools) {
    return schools && schools.schools && schools.schools.edges;
  }

  public getSchoolNames() {
    const { schools } = this.props;
    let schoolNames = [];
    if (this.hasSchools(schools)) {
      // @ts-ignore
      schools.schools.edges.map(({ node }) => {
        // @ts-ignore
        schoolNames.push({ name: node.name, id: node.id });
      });
    }
    return schoolNames;
  }

  public handleSelect(school: School) {
    this.props.setSelectedSchool(school);
    this.props.setSelectedGrades(school, this.props.schools);
  }

  public render() {
    const { onClose, onSubmit, selectedGrades } = this.props;
    const schoolNames = this.getSchoolNames();
    const grades = selectedGrades || [
      {
        name: "8"
      }
    ];
    return (
      <>
        <div className="modal-backdrop show"></div>
        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          style={{
            display: "block",
            opacity: 1
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New message
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="col-form-label">Schools:</label>
                    <Combobox
                      textField="name"
                      valueField="id"
                      defaultValue={schoolNames[0]}
                      onSelect={(school: School) => this.handleSelect(school)}
                      data={schoolNames}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Grade:</label>
                    <Combobox
                      defaultValue={grades[0].name}
                      valueField="name"
                      textField="name"
                      data={grades}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const ModalFragmentContainer = createFragmentContainer(Modal, {
  schools: graphql`
    fragment modal_schools on Viewer {
      schools {
        edges {
          node {
            name
            id
            grades {
              name
            }
          }
        }
      }
    }
  `
});

export default ModalFragmentContainer;
