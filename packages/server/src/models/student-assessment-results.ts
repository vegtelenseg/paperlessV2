import {BaseModel} from './base';
import {Student} from './student';
import {AssessmentResult} from './assessment-result';

export class StudentAssessmentResult extends BaseModel {
  public studentIdNumber!: string;
  public assessmentResultId!: number;

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
        modelClass: AssessmentResult,
        join: {
          from: 'studentAssessmentResult.assessmentResultId',
          to: 'assessmentResult.id',
        },
      },
    };
  }
}
