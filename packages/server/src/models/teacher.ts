import Person from './person';
import {Subject} from './subject';
import {School} from './school';
import {Grade} from './grade';

export class Teacher extends Person {
  public idNumber!: string;
  public subjectId!: number;
  public schools!: School[];
  public subjects!: Subject[];
  public grades!: Grade[];
  public readonly id!: number;

  static get tableName() {
    return 'teacher';
  }

  public static get relationMappings() {
    return {
      schools: {
        relation: Person.ManyToManyRelation,
        modelClass: School,
        join: {
          from: 'teacher.id',
          through: {
            from: 'schoolTeacher.teacherId',
            to: 'schoolTeacher.schoolId',
          },
          to: 'school.id',
        },
      },
      subjects: {
        relation: Person.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'teacher.id',
          through: {
            from: 'subjectTeacher.teacherId',
            to: 'subjectTeacher.subjectId',
          },
          to: 'subject.id',
        },
      },
      assessments: {
        relation: Person.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'teacher.id',
          through: {
            from: 'subjectTeacher.teacherId',
            to: 'subjectTeacher.subjectId',
          },
          to: 'subject.id',
        },
      },
      grades: {
        relation: Person.ManyToManyRelation,
        modelClass: Grade,
        join: {
          from: 'teacher.id',
          through: {
            from: 'teacherGrade.teacherId',
            to: 'teacherGrade.gradeId',
          },
          to: 'grade.id',
        },
      },
    };
  }
}
