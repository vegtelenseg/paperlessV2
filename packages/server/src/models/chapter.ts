import {BaseModel} from './base';
import {Subject} from './subject';

export class Chapter extends BaseModel {
  public subjectId!: number;
  public name!: string;
  public description?: string;
  public totalMarks!: number;

  static get relationMappings() {
    return {
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'chapter.subject_id',
          to: 'subject.id',
        },
      },
    };
  }
}
