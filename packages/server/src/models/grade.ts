import {BaseModel} from './base';
import {Subject} from './subject';

export class Grade extends BaseModel {
  public name!: string;
  public id!: number;
  public subjects?: Subject[];

  static get tableName() {
    return 'grade';
  }
  static get relationMappings() {
    return {
      subjects: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'grade.id',
          through: {
            from: 'subjectGrade.gradeId',
            to: 'subjectGrade.subjectId',
          },
          to: 'subject.id',
        },
      },
    };
  }
}
