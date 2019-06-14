import Person from './person';
import {Assessment} from './assessment';
import {Subject} from './subject';

export class Teacher extends Person {
  public idNumber!: string;

  static get idColumn() {
    return 'id_number';
  }
  static get tableName() {
    return 'teacher';
  }

  public static get relationMappings() {
    return {
      assessment: {
        relation: Person.ManyToManyRelation,
        modelClass: Assessment,
        join: {
          from: 'teacher.id',
          through: {
            from: 'subjectAssessment.teacherId',
            to: 'subjectAssessment.assessmentId',
          },
          to: 'assessment.id',
        },
      },
      subject: {
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
    };
  }
}
