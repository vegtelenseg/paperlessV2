import Person from './person';
import {Model} from 'objection';
import {Teacher} from './teacher';

export class Student extends Person {
  public classTeacherId!: number;

  static get relationMappings() {
    return {
      classTeacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher,
        join: {
          from: 'student.class_teacher_id',
          to: 'teacher.id',
        },
      },
    };
  }
}
