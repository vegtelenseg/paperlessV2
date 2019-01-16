import { BaseModel } from  './base';
import { Assessment } from './assessment';
import { Chapter } from './chapter';

export class AssessmentChapter extends BaseModel {
  public assessmentId!: number;
  public chapterId!: number;

  static get relationMappings() {
    return {
      assessment: {
        relation: BaseModel.HasManyRelation,
        modelClass: Assessment,
        join: {
          from: 'assessmentChapter.assessmentId',
          to: 'assessment.id'
        }
      },
      chapter: {
        relation: BaseModel.HasManyRelation,
        modelClass: Chapter,
        join: {
          from: 'assessmentChapter.chapterId',
          to: 'chapter.id'
        }
      }
    }
  }
}