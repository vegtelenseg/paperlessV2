import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';

// import {
//   Teacher,
//   Subject,
// } from '../models';
import tracer from '../tracer';
import subjects from './dev/subject.data';
import {generateIdNumber} from '../utils/id-generator';
import // createStudent,
// createTeacher,
// createSubject,
// createChapter,
//createSchool,
// createGrade,
//  createAssessment,
'./dev';
import {createProvince} from './dev/province';
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
  const grades = ['8', '9', '10', '11', '12'];
  const tables = [
    'student',
    'teacher',
    'subject',
    'chapter',
    'assessment',
    'student_subject',
    'school',
    'school_teacher',
    'subject_teacher',
    'grade',
    'school_grade',
    'subject_grade',
  ];

  // We need to do this otherwise the db gets dirty
  for (let i = 0; i < tables.length; i++) {
    await knex(tables[i]).del();
  }

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
  ];
  for (let i = 0; i < provinces.length; i++) {
    await createProvince(context, knex, {
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
      });
  }

  for (let i = 0; i < 4; i++) {
    const gender = genders[Math.round(Math.random())];
    const sBirthDate = randomDate.getRandomDateInRange(sStartDate, sEndDate);
    const subjects = await Subject.query(knex).context({context});
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
        subjects: subjects.map((subject) => ({
          '#dbRef': subject.id,
        })),
      });
  }
  const studentList = await Student.query(knex).context({context});
  const teacherList = await Teacher.query(knex).context({context});

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
          students: studentList.map((student) => ({
            '#dbRef': student.id,
          })),
          teachers: teacherList.map((teacher) => ({
            '#dbRef': teacher.id,
          })),
        });
    }
  });
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
  for (let i = 0; i < assessmentList.length; i++) {
    for (let j = 0; j < subjects[j].chapters.length; j++) {
      await Chapter.query(knex)
        .context({context})
        .insertGraph({
          name: subjects[i].chapters[j].name,
          // @ts-ignore
          assessments: [{'#dbRef': assessmentList[i].id}],
          maxScore: Math.floor(Math.random() * 10),
        });
    }
  }

  const assessmendChaptersList = await AssessmentChapter.query(knex).context({
    context,
  });
  for (let i = 0; i < studentList.length; i++) {
    for (let j = 0; j < assessmendChaptersList.length; j++) {
      await StudentResult.query(knex)
        .context({context})
        .insertGraph({
          studentId: studentList[i].id,
          assessmentChapterId: assessmendChaptersList[j].id,
          score: Math.floor(Math.random() * 10),
        });
    }
  }
}
