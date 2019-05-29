import {BaseModel} from './base';

export class School extends BaseModel {
  public name!: string;
  public active!: boolean;
  public registeredDate!: Date;

  static get idColumn() {
    return 'id';
  }
}
