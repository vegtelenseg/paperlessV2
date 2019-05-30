import Context from '../../context';
import Knex from 'knex';
import {Student} from '../../models';

export const createStudent = async (
  context: Context,
  trx: Knex,
  {
    firstName,
    lastName,
    birthDate,
    gender,
    contactPhone,
    id,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    id: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
  }
): Promise<Student> => {
  return Student.query(trx)
    .context(context)
    .insertAndFetch({
      firstName,
      lastName,
      birthDate,
      gender,
      contactPhone,
      id,
    });
};
