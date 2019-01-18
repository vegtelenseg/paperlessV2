import {BaseModel} from './base';
import {Subject} from './subject';

export class SubjectSession extends BaseModel {
  public subjectId!: number;
  public startDate!: Date;
  public endDate?: Date;

  static get relationMappings() {
    return {
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'subjectSession.subject_id',
          to: 'subject.id',
        },
      },
    };
  }
}
