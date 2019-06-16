import {BaseModel} from './base';
import {Assessment} from './assessment';

export class Subject extends BaseModel {
  public name!: string;
  public commitment?: string;
  public description?: string;
  public assessments?: Assessment[];
  public readonly id!: number;

  static get tableName() {
    return 'subject';
  }
}
