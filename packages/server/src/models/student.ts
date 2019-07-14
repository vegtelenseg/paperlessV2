import Person from './person';
import {Subject} from './subject';
import {Grade} from './grade';
import {School} from './school';

export class Student extends Person {
  public readonly id!: number;
  public subjects!: Subject[];
  public school!: School;
  public grades!: Grade[];

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
      school: {
        relation: Person.ManyToManyRelation,
        modelClass: School,
        join: {
          from: 'student.id',
          through: {
            from: 'schoolStudent.studentId',
            to: 'schoolStudent.schoolId',
          },
          to: 'school.id',
        },
      },
      grades: {
        relation: Person.ManyToManyRelation,
        modelClass: Grade,
        join: {
          from: 'student.id',
          through: {
            from: 'studentGrade.studentId',
            to: 'studentGrade.gradeId',
          },
          to: 'grade.id',
        },
      },
    };
  }
}
