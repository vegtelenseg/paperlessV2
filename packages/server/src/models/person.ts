import {BaseModel} from './base';

export default class Person extends BaseModel {
  public idNumber!: string;
  public firstName?: string;
  public lastName?: string;
  public birthDate?: Date;
  public gender?: string;
  public title?: string;
  public contactPhone?: string;
  public contactMobile?: string;
  public contactMail?: string;
}
