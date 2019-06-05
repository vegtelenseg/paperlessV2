import {BaseModel} from './base';
import {Grade} from './grade';
import {School} from './school';

export class SchoolGrade extends BaseModel {
  public gradeId!: number;
  public schoolId!: number;

  static get relationMappings() {
    return {
      grade: {
        relation: BaseModel.HasManyRelation,
        modelClass: Grade,
        join: {
          from: 'schoolGrade.gradeId',
          to: 'grade.id',
        },
      },
      school: {
        relation: BaseModel.HasManyRelation,
        modelClass: School,
        join: {
          from: 'schoolGrade.schoolId',
          to: 'school.id',
        },
      },
    };
  }
}
