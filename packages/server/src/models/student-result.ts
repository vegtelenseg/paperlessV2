import {BaseModel} from './base';
import {Student} from './student';
import {AssessmentChapter} from './assessment-chapter';

export class StudentResult extends BaseModel {
  public assessmentChapterId!: number;
  public studentId!: number;
  public score!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentResult.studentId',
          to: 'student.id',
        },
      },
      assessmentChapter: {
        relation: BaseModel.HasManyRelation,
        modelClass: AssessmentChapter,
        join: {
          from: 'studentResult.assessmentChapterId',
          to: 'assessmentChapter.id',
        },
      },
    };
  }
}
