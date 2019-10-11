import {BaseModel} from './base';

export default class Users extends BaseModel {
  public id?: number;
  public email!:  string;
  public password!: string;

  static get tableName() {
    return 'users';
  }
}