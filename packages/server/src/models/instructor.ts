import Person from './person';

export class Instructor extends Person {
  public idNumber!: string;

  static get idColumn() {
    return 'id_number';
  }
}
