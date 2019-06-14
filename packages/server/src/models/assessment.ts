import {BaseModel} from './base';
//import {Subject} from './subject';
import {Chapter} from './chapter';
//import { Teacher } from './teacher';

export class Assessment extends BaseModel {
  public totalMarks!: number;
  public kind!: string;
  public startDate!: Date;
  public endDate?: Date;
  public subjectId!: number;
  public id!: number;

  public static get relationMappings() {
    return {
      chapter: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Chapter,
        join: {
          from: 'assessment.id',
          through: {
            from: 'assessmentChapter.assessmentId',
            to: 'assessmentChapter.chapterId',
          },
          to: 'chapter.id',
        },
      },
    };
  }
}
