import {BaseModel} from './base';
import {School} from './school';

export class Province extends BaseModel {
  public readonly id!: number;
  public name!: string;

  public static get relationMappings() {
    return {
      school: {
        relation: BaseModel.HasManyRelation,
        modelClass: School,
        join: {
          from: 'province.id',
          to: 'school.provinceId',
        },
      },
    };
  }
}
