import {BaseModel} from './base';
import {Subject} from './subject';
import {Student} from './student';
import {Teacher} from './teacher';

export class Grade extends BaseModel {
  public name!: string;
  public id!: number;
  public students!: Student[];
  public teachers!: Student[];
  public subjects?: Subject[];

  static get tableName() {
    return 'grade';
  }
  static get relationMappings() {
    return {
      subjects: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'grade.id',
          through: {
            from: 'subjectGrade.gradeId',
            to: 'subjectGrade.subjectId',
          },
          to: 'subject.id',
        },
      },
      students: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'grade.id',
          through: {
            from: 'studentGrade.gradeId',
            to: 'studentGrade.studentId',
          },
          to: 'student.id',
        },
      },
      teachers: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Teacher,
        join: {
          from: 'grade.id',
          through: {
            from: 'teacherGrade.gradeId',
            to: 'teacherGrade.teacherId',
          },
          to: 'teacher.id',
        },
      },
    };
  }
}
