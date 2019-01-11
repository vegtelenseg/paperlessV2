import {Instructor} from './instructor';
import {Course} from './course';
import {BaseModel} from './base';

export class OnCourse extends BaseModel {
  public instructorId!: number;
  public courseId!:number;
  static get relationMappings() {
    return {
      instructor: {
        relation: BaseModel.HasManyRelation,
        modelClass: Instructor,
        join: {
          from: 'onCourse.instructor_id',
          to: 'instructor.id',
        },
      },
      course: {
        relation: BaseModel.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'onCourse.courseId',
          to: 'course.id',
        },
      },
    };
  }
}
