import Person from './person';
import {Model} from 'objection';
import {Teacher} from './teacher';

export class Student extends Person {
  static get relationMappings() {
    return {
      classTeacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher,
        join: {
          from: 'student.id',
          to: 'teacher.id',
        },
      },
    };
  }
}
