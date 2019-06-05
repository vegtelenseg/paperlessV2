import {BaseModel} from './base';

export class Province extends BaseModel {
  public name!: string;
  public readonly id!: number;
}
