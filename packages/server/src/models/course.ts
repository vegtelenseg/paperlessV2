import {BaseModel} from './base';

export class Course extends BaseModel {
  public name!: string;
  public commitment?: string;
  public description?: string;
  public minGrade!: number;
}
