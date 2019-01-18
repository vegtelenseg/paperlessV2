import { BaseModel } from './base';
import { Student } from './student';
import { Subject } from './subject';

export class StudentResult extends BaseModel {
  public studentId!: number;
  public subjectId!: number;
  public totalMarks!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentSubject.student_id',
          to: 'student.id'
        }
      },
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'studentSubject.subjectId',
          to: 'subject.id'
        }
      }      
    }
  }
}