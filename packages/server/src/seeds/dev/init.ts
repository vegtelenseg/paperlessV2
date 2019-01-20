import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';
import Uuid from 'uuid';

import {
  Instructor,
  Student,
  Subject,
  OnSubject,
  Chapter,
  Assessment,
  AssessmentChapter,
  StudentSubject,
} from '../../models';
import Context from '../../context';
import tracer from '../../tracer';
import {subjects} from './data/subject';
import {School} from '../../models/school';
import {generateIdNumber} from '../../utils/id-generator';
import {AssessmentResult} from '../../models/assessment-result';

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
    idNumber,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    contactPhone?: string;
    contactMobile?: string;
    contactMail?: string;
    title: string;
    idNumber: string;
  }
): Promise<Instructor> => {
  return Instructor.query(trx)
    .context(context)
    .insertAndFetch({
      firstName,
      lastName,
      birthDate,
      gender,
      contactPhone,
      title,
      idNumber,
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
    idNumber,
  }: {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    idNumber: string;
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
      idNumber,
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
): Promise<Subject> => {
  return Subject.query(trx)
    .context(context)
    .insertGraph({
      name,
      commitment,
    });
};

const createStudentSubject = async (
  context: Context,
  trx: Knex,
  {studentIdNumber, subjectId}: {studentIdNumber: string; subjectId: number}
): Promise<StudentSubject> => {
  return await StudentSubject.query(trx)
    .context(context)
    .insertGraph({
      studentIdNumber,
      subjectId,
    });
};

const createOnSubject = async (
  context: Context,
  trx: Knex,
  {
    instructorIdNumber,
    subjectId,
  }: {
    instructorIdNumber: string;
    subjectId: number;
  }
): Promise<OnSubject> => {
  return await OnSubject.query(trx)
    .context(context)
    .insertGraph({
      instructorIdNumber,
      subjectId,
    });
};

const createChapter = async (
  context: Context,
  trx: Knex,
  {
    subjectId,
    name,
    totalMarks,
  }: {
    subjectId: number;
    name: string;
    totalMarks: number;
  }
): Promise<Chapter> => {
  return await Chapter.query(trx)
    .context(context)
    .insertGraph({
      subjectId,
      name,
      totalMarks,
    });
};

const createAssessment = async (
  context: Context,
  trx: Knex,
  {
    kind,
    totalMarks,
    startDate,
    endDate,
  }: {
    kind: string;
    totalMarks: number;
    startDate: Date;
    endDate?: Date;
  }
): Promise<Assessment> => {
  return await Assessment.query(trx)
    .context(context)
    .insertGraph({
      kind,
      totalMarks,
      startDate,
      endDate,
    });
};

const createAssessmentChapter = async (
  context: Context,
  trx: Knex,
  {assessmentId, chapterId}: {assessmentId: number; chapterId: number}
): Promise<AssessmentChapter> => {
  return AssessmentChapter.query(trx)
    .context(context)
    .insertGraph({
      assessmentId,
      chapterId,
    });
};

const createSchool = async (
  context: Context,
  trx: Knex,
  {
    name,
    active,
    registeredDate,
    suuid,
  }: {
    name: string;
    active: boolean;
    registeredDate: Date;
    suuid: string;
  }
): Promise<School> => {
  return await School.query(trx)
    .context(context)
    .insertGraphAndFetch({
      name,
      active,
      registeredDate,
      suuid,
    });
};

const createAssessmentResult = async (
  context: Context,
  trx: Knex,
  {
    assessmentId,
    results,
    percentage,
  }: {
    assessmentId: number;
    results: number;
    percentage: number;
  }
): Promise<AssessmentResult> => {
  return await AssessmentResult.query(trx)
    .context(context)
    .insertGraph({
      assessmentId,
      results,
      percentage,
    });
};

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
    const ibirthDate = randomDate.getRandomDateInRange(iStartDate, iEndDate);
    await createInstructor(context, knex, {
      idNumber: generateIdNumber(ibirthDate),
      firstName:
        gender === 'F'
          ? fakerator.names.firstNameF()
          : fakerator.names.firstNameM(),
      lastName:
        gender === 'F'
          ? fakerator.names.lastNameF()
          : fakerator.names.lastNameM(),
      title: gender === 'F' ? 'Mrs' : 'Mr',
      birthDate: ibirthDate,
      gender: genders[Math.round(Math.random())],
      contactPhone: fakerator.phone.number(),
    });
  }

  const sStartDate = new Date(1993, 1, 1);
  const sEndDate = new Date(2000, 12, 31);
  for (let i = 0; i < 100; i++) {
    const gender = genders[Math.round(Math.random())];
    const sBirthDate = randomDate.getRandomDateInRange(sStartDate, sEndDate);
    await createStudent(context, knex, {
      idNumber: generateIdNumber(sBirthDate),
      firstName:
        gender === 'F'
          ? fakerator.names.firstNameF()
          : fakerator.names.firstNameM(),
      lastName:
        gender === 'F'
          ? fakerator.names.lastNameF()
          : fakerator.names.lastNameM(),
      birthDate: sBirthDate,
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
        instructorIdNumber: instructor.idNumber,
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
        totalMarks: fakerator.random.number(1, 25),
      });
    }
  }

  const mockAssessments = [
    {
      kind: 'Class Test',
      totalMarks: 50,
      startDate: new Date(2019, 2, 23),
      endDate: undefined,
    },
    {
      kind: 'Project',
      totalMarks: 100,
      startDate: new Date(2019, 2, 3),
      endDate: new Date(2019, 2, 10),
    },
    {
      kind: 'Assignment',
      totalMarks: 50,
      startDate: new Date(2019, 3, 5),
      endDate: new Date(2019, 3, 8),
    },
    {
      kind: 'Quater Test',
      totalMarks: 100,
      startDate: new Date(2019, 3, 27),
      endDate: undefined,
    },
  ];
  for (let i = 0; i < subjects[0].chapters.length; i++) {
    for (let j = 0; j < subjects[0].chapters.length; j++) {
      const at = i % mockAssessments.length;
      await createAssessment(context, knex, {
        ...mockAssessments[i % mockAssessments.length],
        startDate: randomDate.getRandomDateInRange(mockAssessments[at].startDate, new Date(2019, 3, 31)),
        endDate: mockAssessments[at].endDate ? randomDate.getRandomDateInRange(mockAssessments[at].endDate, new Date(2019, 4, 31)) : undefined
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
        chapterId: chapters[fakerator.random.number(3, 10)].id,
      });
    }
  }

  const students = await Student.query(knex);
  for (let i = 0; i < students.length; i++) {
    await createStudentSubject(context, knex, {
      studentIdNumber: students[i].idNumber,
      subjectId: theSubjects[i % theSubjects.length].id,
    });
  }

  const theChapters = await Chapter.query(knex);
  const theAssessments = await Assessment.query();
  for (let i = 0; i < theChapters.length; i++) {
    const result = fakerator.random.number(10, 50);
    const totalMark = theAssessments[i].totalMarks;
    await createAssessmentResult(context, knex, {
      assessmentId: theChapters[i].id,
      results: result,
      percentage: (result * 100) / totalMark,
    });
  }
  const schools = [
    "Falcon's High School",
    'Essa High School',
    'Evendons High School',
    'Gateway Academy',
  ];
  const registeredDate = {
    start: new Date(2017, 1, 1),
    end: new Date(2019, 1, 1),
  };
  for (let i = 0; i < schools.length; i++) {
    await createSchool(context, knex, {
      suuid: Uuid.v4(),
      name: schools[i],
      registeredDate: randomDate.getRandomDateInRange(
        registeredDate.start,
        registeredDate.end
      ),
      active: false,
    });
  }
}
