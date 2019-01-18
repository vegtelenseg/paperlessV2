import {BaseModel} from './base';

export class Assessment extends BaseModel {
  public kind!: string;
  public totalPoints!: number;
}
