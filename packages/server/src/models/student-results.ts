import {BaseModel} from './base';
import { Assessment } from './assessment';
import { Chapter } from './chapter';

export class StudentResults extends BaseModel {
  public assessmentChapterId!: number;
  public studentId!: number;
  public score!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Chapter,
        join: {
          from: 'studentResults.studentId',
          to: 'student.id',
        },
      },
      assessment: {
        relation: BaseModel.HasManyRelation,
        modelClass: Assessment,
        join: {
          from: 'studentResults.assessmentChapterId',
          to: 'assessmentChapter.id',
        },
      },
    };
  }
}
