import Person from './person';

export class Teacher extends Person {
  public idNumber!: string;

  static get idColumn() {
    return 'id_number';
  }
}
