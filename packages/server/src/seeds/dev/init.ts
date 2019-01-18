import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';

import {
  Instructor,
  Student,
  Course,
  OnCourse,
  Chapter,
  Assessment,
  CourseSession,
  Status,
  EnrolledCourse,
  AssessmentChapter,
  StudentResult
} from '../../models';
import Context from '../../context';
import tracer from '../../tracer';
import { courses } from './data/course';


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

const createCourse = async (
  context: Context,
  trx: Knex,
  {
    name,
    totalPoints,
    commitment,
  }: {
    name: string;
    totalPoints: number;
    commitment?: string;
  }
) => {
  return Course.query(trx)
    .context(context)
    .insertGraph({
      name,
      totalPoints,
      commitment,
    });
};

const createOnCourse = async (
  context: Context,
  trx: Knex,
  {
    instructorId,
    courseId,
  }: {
    instructorId: number;
    courseId: number;
  }
) => {
  return await OnCourse.query(trx)
    .context(context)
    .insertGraph({
      instructorId,
      courseId,
    });
};

const createChapter = async (
  context: Context,
  trx: Knex,
  {
    courseId,
    name,
    totalPoints
  }: {
    courseId: number;
    name: string;
    totalPoints: number
  }
) => {
  return await Chapter.query(trx)
    .context(context)
    .insertGraph({
      courseId,
      name,
      totalPoints
    });
};

const createAssessment = async (
  context: Context,
  trx: Knex,
  {
    kind,
    totalPoints,
  }: {
    kind: string;
    totalPoints: number;
  }
) => {
  return await Assessment.query(trx)
    .context(context)
    .insertGraph({
      kind,
      totalPoints,
    });
};

const createCourseSession = async (
  context: Context,
  trx: Knex,
  {
    courseId,
    startDate,
    endDate,
  }: {
    courseId: number;
    startDate: Date;
    endDate: Date;
  }
) => {
  return await CourseSession.query(trx)
    .context(context)
    .insertGraph({
      courseId,
      startDate,
      endDate,
    });
};

const createStatus = async (
  context: Context,
  trx: Knex,
  {name}: {name: string}
) => {
  await Status.query(trx)
    .context(context)
    .insertGraph({
      name,
    });
};

const createEnrolledCourse = async (context: Context, trx: Knex, {
  studentId,
  courseSessionId,
  statusId,
  enrolmentDate,
  statusDate,
  finalGrade
}: {
  studentId: number,
  courseSessionId: number,
  statusId: number
  enrolmentDate: Date,
  statusDate: Date,
  finalGrade: number
}) => {
  await EnrolledCourse.query(trx).context(context).insertGraph({
    studentId,
    courseSessionId,
    statusId,
    enrolmentDate,
    statusDate,
    finalGrade
  })
}

const createAssessmentChapter = async (context: Context, trx: Knex, {
  assessmentId,
  chapterId
}: { assessmentId: number, chapterId: number}) => {
  return AssessmentChapter.query(trx).context(context).insertGraph({
    assessmentId,
    chapterId
  })
}

const createStudentResult = async (context: Context, trx: Knex, {
  studentId,
  courseId,
  totalPoints
}: {
  studentId: number,
  courseId: number,
  totalPoints: number
}) => {
  return StudentResult.query(trx).context(context).insertGraph({
    studentId,
    courseId,
    totalPoints
  })
}

export async function seed(knex: Knex) {
  const fakerator = Fakerator();
  const genders = ['F', 'M'];
  const context = await createSeedContext();

  await knex('instructor').del();
  await knex('student').del();
  await knex('course').del();
  await knex('on_course').del();
  await knex('chapter').del();
  await knex('assessment').del();
  await knex('course_session').del();
  await knex('status').del();
  await knex('enrolled_course').del();
  await knex('student_result').del();
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

  
  for (let i = 0; i < courses.length; i++) {
    await createCourse(context, knex, {
      name: courses[i].name,
      totalPoints: fakerator.random.number(65, 100),
    });
  }

  const instructors = await Instructor.query();
  for (let i = 0; i < instructors.length; i++) {
    const courseId = (i + 1) % 7;
    const instructor = instructors[i];
    const course = await Course.query(knex)
      .where('id', courseId === 0 ? 7 : courseId)
      .first();

    if (course && instructor) {
      await createOnCourse(context, knex, {
        instructorId: instructor.id,
        courseId: course.id,
      });
    }
  }

  const theCourses = await Course.query(knex); // Be careful, this is used in many places.
  for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].chapters.length; j++) {
      await createChapter(context, knex, {
        courseId: theCourses[i].id,
        name: courses[i].chapters[j].name,
        totalPoints: fakerator.random.number(1, 25)
      });
    }
  }

  for (let i = 0; i < courses[0].chapters.length; i++) {
    for (let j = 0; j < courses[0].chapters.length; j++) {
      await createAssessment(context, knex, {
        kind: 'Class Test',
        totalPoints: 50,
      });
    }
  }

  for (let i = 0; i < theCourses.length; i++) {
    await createCourseSession(context, knex, {
      courseId: theCourses[i].id,
      startDate: new Date(2019, 1, 1),
      endDate: new Date(2019, 12, 31),
    });
  }

  const statuses = ['Passed', 'Dropped Out', 'Failed'];

  for (let i = 0; i < statuses.length; i++) {
    await createStatus(context, knex, {
      name: statuses[i]
    });
  }

  const students = await Student.query(knex); // Be careful. this is used in multiple places
  const courseSession = await CourseSession.query(knex);
  //const status = await Status.query(knex);
  for (let i = 0; i < students.length; i++) {
    const finalGrade = fakerator.random.number(1, 100);
    await createEnrolledCourse(context, knex, {
      studentId: students[i].id,
      courseSessionId: courseSession[i % courseSession.length].id,
      enrolmentDate: new Date(2019, 4, 1),
      statusDate: new Date(2019, 6, 10),
      finalGrade,
      statusId: finalGrade <= 45 ? 3 : 1
    })
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

  for (let i = 0; i < students.length; i++) {
    await createStudentResult(context, knex, {
      studentId: students[i].id,
      courseId: theCourses[i % theCourses.length].id,
      totalPoints: fakerator.random.number(1, 100)
    })
  }
}
