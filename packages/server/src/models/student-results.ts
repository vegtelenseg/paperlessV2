import { BaseModel } from './base';
import { Student } from './student';
import { Course } from './course';

export class StudentResult extends BaseModel {
  public studentId!: number;
  public courseId!: number;
  public score!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentResult.student_id',
          to: 'student.id'
        }
      },
      course: {
        relation: BaseModel.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'studentResult.courseId',
          to: 'course.id'
        }
      }      
    }
  }
}