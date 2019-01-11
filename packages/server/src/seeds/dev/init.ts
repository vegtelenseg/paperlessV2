import Knex from 'knex';

import {Instructor, Student, Course, OnCourse, Chapter} from '../../models/';
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
    minGrade,
    commitment,
  }: {
    name: string;
    minGrade: number;
    commitment?: string;
  }
) => {
  return Course.query(trx)
    .context(context)
    .insertGraph({
      name,
      minGrade,
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

const createChapter = async (context: Context, trx: Knex, {
  courseId,
  name
}: {
  courseId: number,
  name: string
}) => {
  return await Chapter.query(trx).context(context).insertGraph({
    courseId,
    name
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

  const courses = [
    {
      name: 'Physical Sciences',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Geography',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Mathematics',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Accounting',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Economics',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Life Sciences',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
    {
      name: 'Business Studies',
      minGrade: 70,
      commitment: '12 months',
      chapters: [
        {
          name: 'Skills for Science',
        },
        {
          name: 'Momentum and Impulse',
        },
        {
          name: 'Vertical Projectile Motion in One Dimension',
        },
        {
          name: 'Organic molecules',
        },
        {
          name: 'Work, energy and power',
        },
        {
          name: 'Doppler effect',
        },
        {
          name: 'Rate and Extent of Reaction',
        },
        {
          name: 'Chemical Equilibrium',
        },
        {
          name: 'Acids and Bases',
        },
        {
          name: 'Electric Circuits',
        },
        {
          name: 'Electrodynamics',
        },
        {
          name: 'Optical phenomena and properties of matter',
        },
        {
          name: 'Electrochemical reactions',
        },
        {
          name: 'The Chemical Industry',
        },
      ],
    },
  ];
  for (let i = 0; i < courses.length; i++) {
    await createCourse(context, knex, {
      name: courses[i].name,
      minGrade: courses[i].minGrade
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

  const theCourses = await Course.query(knex);
  console.log(theCourses);
  for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < courses[i].chapters.length; j++) {
      await createChapter(context, knex, {
        courseId: theCourses[i].id,
        name: courses[i].chapters[j].name
      });      
    }
  }
  
}
