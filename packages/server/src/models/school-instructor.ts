import {BaseModel} from './base';
import {School} from './school';
import {Instructor} from './instructor';

export class SchoolInstructor extends BaseModel {
  public schoolId!: string;
  public instructorIdNumber!: string;
  public active!: boolean;

  static get relationMappings() {
    return {
      schools: {
        relation: BaseModel.HasManyRelation,
        modelClass: School,
        join: {
          from: 'schoolInstructor.schoolId',
          to: 'school.suuid',
        },
      },
      instructor: {
        relation: BaseModel.HasManyRelation,
        modelClass: Instructor,
        join: {
          from: 'schoolInstructor.instructorIdNumber',
          to: 'instructor.id_number',
        },
      },
    };
  }
}
