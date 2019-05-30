import {BaseModel} from './base';

export class Chapter extends BaseModel {
  public name!: string;
  public description?: string;
  public contribution!: number;
}
