import {BaseModel} from './base';
import {Province} from '../models';

export class School extends BaseModel {
  public id!: number;
  public provinceId!: number;
  public name!: string;
  public active!: boolean;
  public registeredDate!: Date;

  public static relationMappings() {
    return {
      province: {
        relation: BaseModel.HasManyRelation,
        modelClass: Province,
        join: {
          from: 'school.provinceId',
          to: 'province.id',
        },
      },
    };
  }
}
