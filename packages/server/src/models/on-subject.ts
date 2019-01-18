import {Instructor} from './instructor';
import {Subject} from './subject';
import {BaseModel} from './base';

export class OnSubject extends BaseModel {
  public instructorId!: number;
  public subjectId!: number;
  static get relationMappings() {
    return {
      instructor: {
        relation: BaseModel.HasManyRelation,
        modelClass: Instructor,
        join: {
          from: 'onSubject.instructor_id',
          to: 'instructor.id',
        },
      },
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'onSubject.subjectId',
          to: 'subject.id',
        },
      },
    };
  }
}
