import Person from './person';

export class Student extends Person {
  public readonly id!: number;
  public grade!: number;
}
