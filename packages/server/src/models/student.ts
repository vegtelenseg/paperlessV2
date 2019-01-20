import Person from './person';

export class Student extends Person {
  public grade!: number;
  public idNumber!: string;

  static get idColumn() {
    return 'id_number';
  }
}
