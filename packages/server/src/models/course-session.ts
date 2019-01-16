import {BaseModel} from './base';
import {Course} from './course';

export class CourseSession extends BaseModel {
  public courseId!: number;
  public startDate!: Date;
  public endDate?: Date;

  static get relationMappings() {
    return {
      course: {
        relation: BaseModel.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'courseSession.course_id',
          to: 'course.id',
        },
      },
    };
  }
}
