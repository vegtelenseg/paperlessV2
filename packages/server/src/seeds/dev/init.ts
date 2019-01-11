import Knex from 'knex';

import {Instructor} from '../../models/';
import Context from '../../context';
import tracer from '../../tracer';

const createInstructor = async (
  context: Context,
  trx: Knex,
  {
    firstName,
    lastName,
    birthDate,
    gender,
    contactPhone,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
  }
) => {
  return Instructor.query(trx)
    .context(context)
    .insertAndFetch({
      firstName,
      lastName,
      birthDate,
      gender,
      contactPhone,
    });
};

const createSeedContext = async () => {
  return {span: tracer.startSpan('seed')};
};

export async function seed(knex: Knex) {
  const context = await createSeedContext();

  await createInstructor(context, knex, {
    firstName: 'siya',
    lastName: 'mzam',
    birthDate: new Date(1993, 6, 25),
    gender: 'M',
    contactPhone: '0659455109',
  });
}
