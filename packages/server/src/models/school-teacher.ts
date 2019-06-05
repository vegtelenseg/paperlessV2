import {BaseModel} from './base';
import {School} from './school';
import {Teacher} from './teacher';

export class SchoolTeacher extends BaseModel {
  public schoolId!: number;
  public teacherIdNumber!: string;
  public active!: boolean;

  static get relationMappings() {
    return {
      schools: {
        relation: BaseModel.HasManyRelation,
        modelClass: School,
        join: {
          from: 'schoolTeacher.schoolId',
          to: 'school.id',
        },
      },
      teacher: {
        relation: BaseModel.HasManyRelation,
        modelClass: Teacher,
        join: {
          from: 'schoolTeacher.teacherIdNumber',
          to: 'teacher.idNumber',
        },
      },
    };
  }
}
