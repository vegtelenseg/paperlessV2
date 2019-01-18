import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';

import {
  Instructor,
  Student,
  Subject,
  OnSubject,
  Chapter,
  Assessment,
  AssessmentChapter,
} from '../../models';
import Context from '../../context';
import tracer from '../../tracer';
import { subjects } from './data/subject';


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
    title,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
    title: string;
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
      title,
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

const createSubject = async (
  context: Context,
  trx: Knex,
  {
    name,
    commitment,
  }: {
    name: string;
    commitment?: string;
  }
) => {
  return Subject.query(trx)
    .context(context)
    .insertGraph({
      name,
      commitment,
    });
};

const createOnSubject = async (
  context: Context,
  trx: Knex,
  {
    instructorId,
    subjectId,
  }: {
    instructorId: number;
    subjectId: number;
  }
) => {
  return await OnSubject.query(trx)
    .context(context)
    .insertGraph({
      instructorId,
      subjectId,
    });
};

const createChapter = async (
  context: Context,
  trx: Knex,
  {
    subjectId,
    name,
    totalMarks
  }: {
    subjectId: number;
    name: string;
    totalMarks: number
  }
) => {
  return await Chapter.query(trx)
    .context(context)
    .insertGraph({
      subjectId,
      name,
      totalMarks
    });
};

const createAssessment = async (
  context: Context,
  trx: Knex,
  {
    kind,
    totalMarks,
  }: {
    kind: string;
    totalMarks: number;
  }
) => {
  return await Assessment.query(trx)
    .context(context)
    .insertGraph({
      kind,
      totalMarks,
    });
};

const createAssessmentChapter = async (context: Context, trx: Knex, {
  assessmentId,
  chapterId
}: { assessmentId: number, chapterId: number}) => {
  return AssessmentChapter.query(trx).context(context).insertGraph({
    assessmentId,
    chapterId
  })
}

export async function seed(knex: Knex) {
  const fakerator = Fakerator();
  const genders = ['F', 'M'];
  const context = await createSeedContext();

  await knex('instructor').del();
  await knex('student').del();
  await knex('subject').del();
  await knex('on_subject').del();
  await knex('chapter').del();
  await knex('assessment').del();
  await knex('student_subject').del();
  await knex('assessment_chapter').del();

  const iStartDate = new Date(1970, 1, 1);
  const iEndDate = new Date(1985, 12, 31);
  for (let i = 0; i < 30; i++) {
    const gender = genders[Math.round(Math.random())];
    await createInstructor(context, knex, {
      firstName:
        gender === 'F'
          ? fakerator.names.firstNameF()
          : fakerator.names.firstNameM(),
      lastName:
        gender === 'F'
          ? fakerator.names.lastNameF()
          : fakerator.names.lastNameM(),
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
      firstName:
        gender === 'F'
          ? fakerator.names.firstNameF()
          : fakerator.names.firstNameM(),
      lastName:
        gender === 'F'
          ? fakerator.names.lastNameF()
          : fakerator.names.lastNameM(),
      birthDate: randomDate.getRandomDateInRange(sStartDate, sEndDate),
      gender: gender,
      contactPhone: fakerator.phone.number(),
      contactMobile: fakerator.phone.number(),
      contactMail: fakerator.internet.email(),
    });
  }

  
  for (let i = 0; i < subjects.length; i++) {
    await createSubject(context, knex, {
      name: subjects[i].name,
    });
  }

  const instructors = await Instructor.query();
  for (let i = 0; i < instructors.length; i++) {
    const subjectId = (i + 1) % 7;
    const instructor = instructors[i];
    const subject = await Subject.query(knex)
      .where('id', subjectId === 0 ? 7 : subjectId)
      .first();

    if (subject && instructor) {
      await createOnSubject(context, knex, {
        instructorId: instructor.id,
        subjectId: subject.id,
      });
    }
  }

  const theSubjects = await Subject.query(knex); // Be careful, this is used in many places.
  for (let i = 0; i < subjects.length; i++) {
    for (let j = 0; j < subjects[i].chapters.length; j++) {
      await createChapter(context, knex, {
        subjectId: theSubjects[i].id,
        name: subjects[i].chapters[j].name,
        totalMarks: fakerator.random.number(1, 25)
      });
    }
  }

  for (let i = 0; i < subjects[0].chapters.length; i++) {
    for (let j = 0; j < subjects[0].chapters.length; j++) {
      await createAssessment(context, knex, {
        kind: 'Class Test',
        totalMarks: 50,
      });
    }
  }



  const assessments = await Assessment.query(knex);
  const chapters = await Chapter.query(knex);

  for (let i = 0; i < assessments.length; i++) {
    const numOfChapters = fakerator.random.number(3, 10);
    for (let j = 0; j < numOfChapters; j++) {
      await createAssessmentChapter(context, knex, {
        assessmentId: assessments[i].id,
        chapterId: chapters[fakerator.random.number(3, 10)].id
      })
    }
  }
}
