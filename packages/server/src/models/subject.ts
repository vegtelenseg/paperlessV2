import {BaseModel} from './base';

export class Subject extends BaseModel {
  public name!: string;
  public commitment?: string;
  public description?: string;
}
