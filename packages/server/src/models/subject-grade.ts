import {BaseModel} from './base';
import {Subject} from './subject';
import {Grade} from './grade';

export class SubjectGrade extends BaseModel {
  public name!: string;

  public static relationMappings() {
    return {
      subject: {
        relation: BaseModel.HasOneRelation,
        modelClass: Subject,
        join: {
          from: 'subjectGrade.subjectId',
          to: 'subject.id',
        },
      },
      grade: {
        relation: BaseModel.HasOneRelation,
        modelClass: Grade,
        join: {
          from: 'subjectGrade.gradeId',
          to: 'grade.id',
        },
      },
    };
  }
}
