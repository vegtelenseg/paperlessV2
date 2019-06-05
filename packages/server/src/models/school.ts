import {BaseModel} from './base';
import {Province} from '../models';

export class School extends BaseModel {
  public name!: string;
  public active!: boolean;
  public registeredDate!: Date;
  public provinceId!: number;
  public id!: number;

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
