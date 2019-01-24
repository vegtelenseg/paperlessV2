import {BaseModel} from './base';
import {Assessment} from './assessment';

export class AssessmentResult extends BaseModel {
  public assessmentId!: number;
  public results!: number;
  public percentage!: number;

  static get relationMappings() {
    return {
      assessment: {
        relation: BaseModel.HasOneRelation,
        modelClass: Assessment,
        join: {
          from: 'assessmentResult.assessmentId',
          to: 'assessment.id',
        },
      },
    };
  }
}
