import {BaseModel} from './base';

export class Assessment extends BaseModel {
  public kind!: string;
  public totalMarks!: number;
  public startDate!: Date;
  public endDate?: Date;
}
