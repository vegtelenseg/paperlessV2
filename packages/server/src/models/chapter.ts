import {BaseModel} from './base';
import {Assessment} from './assessment';

export class Chapter extends BaseModel {
  public id?: number;
  public name!: string;
  public description?: string;
  public contribution?: number;
  public maxScore!: number;
  public assessments!: Assessment[];

  public static get relationMappings() {
    return {
      assessments: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Assessment,
        join: {
          from: 'chapter.id',
          through: {
            from: 'assessmentChapter.chapterId',
            to: 'assessmentChapter.assessmentId',
          },
          to: 'assessment.id',
        },
      },
    };
  }
}
