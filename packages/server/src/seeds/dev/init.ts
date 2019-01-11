import Knex from 'knex';

import {Instructor, Student} from '../../models/';
import Context from '../../context';
import tracer from '../../tracer';


//@ts-ignore
import randomName from 'random-name';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';

const createSeedContext = async () => {
  return {span: tracer.startSpan('seed')};
};

const createInstructor = async (
  context: Context,
  trx: Knex,
  {
    firstName,
    lastName,
    birthDate,
    gender,
    contactPhone,
    title
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
    title: string
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
      title
    });
};

const createStudent = async (
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
  return Student.query(trx)
    .context(context)
    .insertAndFetch({
      firstName,
      lastName,
      birthDate,
      gender,
      contactPhone,
    });
};

export async function seed(knex: Knex) {
  const fakerator = Fakerator();
  const genders = ['F', 'M'];
  const context = await createSeedContext();

  await knex('instructor').del();
  await knex('student').del();

  const iStartDate = new Date(1970, 1, 1);
  const iEndDate = new Date(1985, 12, 31);
  for (let i = 0; i < 30; i++) {
    const gender = genders[Math.round(Math.random())];
    await createInstructor(context, knex, {
      firstName: gender === 'F' ? fakerator.names.firstNameF() : fakerator.names.firstNameM(),
      lastName: gender === 'F' ? fakerator.names.lastNameF() : fakerator.names.lastNameM(),
      title: gender === 'F' ? 'Mrs' : 'Mr',
      birthDate: randomDate.getRandomDateInRange(iStartDate, iEndDate),
      gender: genders[Math.round(Math.random())],
      contactPhone: fakerator.phone.number(),
    });
    
  }


  const sStartDate = new Date(1993, 1, 1);
  const sEndDate = new Date(2000, 12, 31);
  for (let i = 0; i < 100; i++) {
    const gender = genders[Math.round(Math.random())];
    await createStudent(context, knex, {
      firstName: gender === 'F' ? fakerator.names.firstNameF() : fakerator.names.firstNameM(),
      lastName: gender === 'F' ? fakerator.names.lastNameF() : fakerator.names.lastNameM(),
      birthDate: randomDate.getRandomDateInRange(sStartDate, sEndDate),
      gender: gender,
      contactPhone: fakerator.phone.number(),
      contactMobile: fakerator.phone.number(),
      contactMail: fakerator.internet.email(),
      
    });
  }
}
