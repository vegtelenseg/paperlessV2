import {BaseModel} from './base';
import {Course} from './course';

export class Chapter extends BaseModel {
  public courseId!: number;
  public name!: string;
  public description?: string;
  public totalPoints!: number;

  static get relationMappings() {
    return {
      course: {
        relation: BaseModel.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'chapter.course_id',
          to: 'course.id',
        },
      },
    };
  }
}
