import {BaseModel} from './base';

export default class Person extends BaseModel {
  public name!: string;
  public surname!: string;
  public dob!: string;
  public gender!: string;
}
