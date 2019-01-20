import {Instructor} from './instructor';
import {Subject} from './subject';
import {BaseModel} from './base';

export class OnSubject extends BaseModel {
  public instructorIdNumber!: string;
  public subjectId!: number;
  static get relationMappings() {
    return {
      instructor: {
        relation: BaseModel.HasManyRelation,
        modelClass: Instructor,
        join: {
          from: 'onSubject.instructorIdNumber',
          to: 'instructor.idNumber',
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
