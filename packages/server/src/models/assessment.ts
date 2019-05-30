import {BaseModel} from './base';
import {Subject} from './subject';

export class Assessment extends BaseModel {
  public totalMarks!: number;
  public kind!: string;
  public startDate!: Date;
  public endDate?: Date;
  public subjectId!: number;

  public static relationMappings() {
    return {
      subject: {
        relation: BaseModel.HasOneRelation,
        modelClass: Subject,
        join: {
          from: 'assessment.subjectId',
          to: 'subject.id',
        },
      },
    };
  }
}
