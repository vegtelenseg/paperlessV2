import Person from './person';
import {Subject} from './subject';

export class Student extends Person {
  public readonly id!: number;
  public grade!: number;

  public static get relationMappings() {
    return {
      subject: {
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
