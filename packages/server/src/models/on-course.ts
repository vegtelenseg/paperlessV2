import {Instructor} from './instructor';
import {Course} from './course';
import {BaseModel} from './base';

export class OnCourse extends BaseModel {
  static get relationMappings() {
    return {
      instructor: {
        relation: BaseModel.HasManyRelation,
        modelClass: Instructor,
        join: {
          from: 'on_course.instructor_id',
          to: 'instructor.id',
        },
      },
      course: {
        relation: BaseModel.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'on_course.course_id',
          to: 'course.id',
        },
      },
    };
  }
}
