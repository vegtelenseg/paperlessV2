import {BaseModel} from './base';
//import {Province} from '../models';
import {Grade} from './grade';
import {Teacher} from './teacher';

export class School extends BaseModel {
  public id!: number;
  public provinceId!: number;
  public name!: string;
  public active!: boolean;
  public registeredDate!: Date;
  public grades?: Grade[];
  public teachers?: Teacher[];

  static get tableName() {
    return 'school';
  }
  public static get relationMappings() {
    return {
      grades: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Grade,
        join: {
          from: 'school.id',
          through: {
            from: 'schoolGrade.schoolId',
            to: 'schoolGrade.gradeId',
          },
          to: 'grade.id',
        },
      },
      teachers: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Teacher,
        join: {
          from: 'school.id',
          through: {
            from: 'schoolTeacher.schoolId',
            to: 'schoolTeacher.teacherId',
          },
          to: 'teacher.id',
        },
      },
    };
  }
}
