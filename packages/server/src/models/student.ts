import Person from './person';
import {Subject} from './subject';

export class Student extends Person {
  public readonly id!: number;
  public subjects!: Subject[];
  public grade!: number;

  static get tableName() {
    return 'student';
  }

  public static get relationMappings() {
    return {
      subjects: {
        relation: Person.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'student.id',
          through: {
            from: 'studentSubject.studentId',
            to: 'studentSubject.subjectId',
          },
          to: 'subject.id',
        },
      },
    };
  }
}
