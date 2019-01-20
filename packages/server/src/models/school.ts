import {BaseModel} from './base';

export class School extends BaseModel {
  public name!: string;
  public active!: boolean;
  public registeredDate!: Date;
  public suuid!: string;

  static get idColumn() {
    return 'suuid';
  }
}
