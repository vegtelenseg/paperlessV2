import {BaseModel} from './base';
import {Chapter} from './chapter';
import {AssessmentType} from './assessment-type';

export class Assessment extends BaseModel {
  public name!: string;
  public maxPoints!: number;

  static get relationMappings() {
    return {
      assessmentType: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: AssessmentType,
        join: {
          from: 'assessment.assessment_type_id',
          to: 'assessment_type.id',
        },
      },
      chapter: {
        relation: BaseModel.HasManyRelation,
        modelClass: Chapter,
        join: {
          from: 'assessment.chapter_id',
          to: 'chapter.id',
        },
      },
    };
  }
}
