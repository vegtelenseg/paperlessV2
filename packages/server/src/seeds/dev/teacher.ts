import Context from '../../context';
import Knex from 'knex';
import {Teacher} from '../../models';

export const createTeacher = async (
  context: Context,
  trx: Knex,
  {
    firstName,
    lastName,
    birthDate,
    gender,
    contactPhone,
    title,
    id,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
    title: string;
    id: string;
  }
): Promise<Teacher> => {
  return Teacher.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      firstName,
      lastName,
      birthDate,
      gender,
      contactPhone,
      title,
      id,
    });
};
