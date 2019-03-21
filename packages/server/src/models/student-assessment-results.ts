import {BaseModel} from './base';
import {Student} from './student';
import {Assessment} from '../models';

export class StudentAssessmentResult extends BaseModel {
  public studentIdNumber!: string;
  public assessmentId!: number;
  public result!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentAssessmentResult.studentId',
          to: 'student.idNumber',
        },
      },
      assessmentResult: {
        relation: BaseModel.HasManyRelation,
        modelClass: Assessment,
        join: {
          from: 'studentAssessmentResult.assessmentId',
          to: 'assessment.id',
        },
      },
    };
  }
}
