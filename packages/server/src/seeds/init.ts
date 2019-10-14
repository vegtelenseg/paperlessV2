//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';
import Knex from 'knex';
import tracer from '../tracer';

import {generateIdNumber} from '../utils/id-generator';
import {mockAssessments} from './dev/assessment.data';
import {
  Subject,
  Student,
  Province,
  Teacher,
  Assessment,
  Grade,
  School,
  Chapter,
} from '../models';
import {StudentResult} from '../models/student-result';
import {AssessmentChapter} from '../models/assessment-chapter';
import {provinces, tables, grades, schools, subjects} from './dev/';

const createSeedContext = async () => {
  return {span: tracer.startSpan('seed')};
};

export async function seed(knex: Knex) {
  const fakerator = Fakerator();
  const genders = ['F', 'M'];
  const context = await createSeedContext();
  const iStartDate = new Date(1970, 1, 1);
  const iEndDate = new Date(1985, 12, 31);
  const sStartDate = new Date(1993, 1, 1);
  const sEndDate = new Date(2000, 12, 31);
  const registeredDate = {
    start: new Date(2017, 1, 1),
    end: new Date(2019, 1, 1),
  };

  // We need to do this otherwise the db gets dirty
  for (let i = 0; i < tables.length; i++) {
    await knex(tables[i]).del();
  }

  for (let i = 0; i < provinces.length; i++) {
    await Province.query(knex)
      .context({context})
      .insertGraph({
        name: provinces[i],
      });
  }

  await knex('subject').then(async () => {
    for (let i = 0; i < subjects.length; i++) {
      await Subject.query(knex)
        .context({context})
        .insertGraph({
          name: subjects[i].name,
        });
    }
  });

  await knex('grade').then(async () => {
    const subjects = await Subject.query(knex).context({context});
    for (let i = 0; i < grades.length; i++) {
      await Grade.query(knex)
        .context({context})
        // @ts-ignore
        .insertGraph({
          name: grades[i],
          subjects: subjects.map((subject) => ({
            '#dbRef': subject.id,
          })),
        });
    }
  });

  await knex('school').then(async () => {
    const grades = await Grade.query(knex).context({context});
    const provinces = await Province.query(knex).context({context});
    for (let i = 0; i < schools.length; i++) {
      for (let j = 0; j < grades.length; j++) {
        await School.query(knex)
          .context({context})
          // @ts-ignore
          .insertGraph({
            name: schools[j % schools.length],
            registeredDate: randomDate.getRandomDateInRange(
              registeredDate.start,
              registeredDate.end
            ),
            grades: grades.map((grade) => ({'#dbRef': grade.id})),
            provinceId: provinces[i % provinces.length].id,
            active: false,
          });
      }
    }
  });
  const subjectList = await Subject.query(knex).context({context});
  const gradeList = await Grade.query(knex).context({context});
  for (let i = 0; i < 4; i++) {
    const gender = genders[Math.round(Math.random())];
    const ibirthDate = randomDate.getRandomDateInRange(iStartDate, iEndDate);
    const schools = await School.query(knex).context({context});
    await Teacher.query(knex)
      .context({context})
      // @ts-ignore
      .insertGraph({
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
        schools: schools.map((school) => ({
          '#dbRef': school.id,
        })),
        subjects: subjectList.map((subject) => ({
          '#dbRef': subject.id,
        })),
        grades: gradeList.map((grade) => ({
          '#dbRef': grade.id,
        })),
      });
  }

  const schoolsList = await School.query(knex).context(context);
  for (let i = 0; i < schoolsList.length; i++) {
    for (let j = 0; j < 20; j++) {
      const gender = genders[Math.round(Math.random())];
      const sBirthDate = randomDate.getRandomDateInRange(sStartDate, sEndDate);
      const subjects = await Subject.query(knex).context({context});
      const enrolmentDate = randomDate.getRandomDateInRange(
        new Date(2016, 1, 1),
        new Date(2019, 12, 12)
      );
      await Student.query(knex)
        .context({context})
        // @ts-ignore
        .insertGraph({
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
          enrolmentDate,
          school: {
            '#dbRef': schoolsList[i].id,
          },
          subjects: subjects.map((subject) => ({
            '#dbRef': subject.id,
          })),
          grades: gradeList.map((grade) => ({
            '#dbRef': grade.id,
          })),
        });
    }
  }
  const studentList = await Student.query(knex).context({context});
  const teacherList = await Teacher.query(knex).context({context});

  for (let i = 0; i < subjects[0].chapters.length; i++) {
    const at = i % mockAssessments.length;
    await Assessment.query(knex)
      .context({context})
      // @ts-ignore
      .insertGraph({
        ...mockAssessments[i % mockAssessments.length],
        startDate: randomDate.getRandomDateInRange(
          mockAssessments[at].startDate,
          new Date(2019, 3, 31)
        ),
        endDate: mockAssessments[at].endDate
          ? randomDate.getRandomDateInRange(
              mockAssessments[at].endDate,
              new Date(2019, 4, 31)
            )
          : undefined,
        subjects: subjectList.map((subject) => ({
          '#dbRef': subject.id,
        })),
        teachers: teacherList.map((teacher) => ({
          '#dbRef': teacher.id,
        })),
      });
  }

  const assessmentList = await Assessment.query(knex).context({context});
  for (let i = 0; i < subjectList.length; i++) {
    for (let j = 0; j < 4; j++) {
      await Chapter.query(knex)
        .context({context})
        // @ts-ignore
        .insertGraph({
          name: subjects[i].chapters[j].name,
          assessments: assessmentList.map((assessment) => ({
            '#dbRef': assessment.id,
          })),
          subjectId: subjectList[i].id,
          maxScore: Math.floor(Math.random() * 10),
        });
    }
  }

  const assessmendChaptersList = await AssessmentChapter.query(knex).context({
    context,
  });
  for (let i = 0; i < studentList.length; i++) {
    for (let j = 0; j < assessmendChaptersList.length; j++) {
      const score = Math.floor(Math.random() * 5);
      await StudentResult.query(knex)
        .context({context})
        .insertGraph({
          studentId: studentList[i].id,
          assessmentChapterId: assessmendChaptersList[j].id,
          score:
            score > assessmentList[j % assessmentList.length].totalMarks
              ? assessmentList[j % assessmentList.length].totalMarks
              : score + 1,
        });
    }
  }
}
