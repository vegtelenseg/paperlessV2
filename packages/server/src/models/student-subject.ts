import {BaseModel} from './base';
import {Student} from './student';
import {Subject} from './subject';

export class StudentSubject extends BaseModel {
  public studentIdNumber!: string;
  public subjectId!: number;
  public totalMarks!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentSubject.studentId',
          to: 'student.id',
        },
      },
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'studentSubject.subjectId',
          to: 'subject.id',
        },
      },
    };
  }
}
