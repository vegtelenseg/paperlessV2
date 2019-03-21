import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';
import Uuid from 'uuid';

import {
  Teacher,
  Student,
  Subject,
  Chapter,
  Assessment,
  School,
  Grade,
} from '../models';
import tracer from '../tracer';
import {subjects} from './dev/subject.data';
import {generateIdNumber} from '../utils/id-generator';
import {mockAssessments} from './dev/assessment.data';
import {
  createStudent,
  createTeacher,
  createSubject,
  createChapter,
  createAssessment,
  createSchool,
  createSubjectTeacher,
  createAssessmentResult,
  createStudentSubject,
  createAssessmentChapter,
  createSchoolTeacher,
  createSchoolGrade,
  createGrade,
  createStudentAssessmentResult
} from './dev';
import { AssessmentResult } from '../models/assessment-result';

const createSeedContext = async () => {
  return {span: tracer.startSpan('seed')};
};

export async function seed(knex: Knex) {
  const fakerator = Fakerator();
  const genders = ['F', 'M'];
  const context = await createSeedContext();
  const tables = [
    'student',
    'teacher',
    'subject',
    'chapter',
    'assessment',
    'assessment_chapter',
    'assessment_result',
    'student_assessment_result',
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

  const iStartDate = new Date(1970, 1, 1);
  const iEndDate = new Date(1985, 12, 31);
  for (let i = 0; i < 30; i++) {
    const gender = genders[Math.round(Math.random())];
    const ibirthDate = randomDate.getRandomDateInRange(iStartDate, iEndDate);
    await createTeacher(context, knex, {
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
  for (let i = 0; i < 400; i++) {
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

  const teachers = await Teacher.query(); // This is also being used on the school teacher table
  for (let i = 0; i < teachers.length; i++) {
    const subjectId = (i + 1) % 7;
    const teacher = teachers[i];
    const subject = await Subject.query(knex)
      .where('id', subjectId === 0 ? 7 : subjectId)
      .first();

    if (subject && teacher) {
      await createSubjectTeacher(context, knex, {
        teacherIdNumber: teacher.idNumber,
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

  for (let i = 0; i < subjects[0].chapters.length; i++) {
    for (let j = 0; j < subjects[0].chapters.length; j++) {
      const at = i % mockAssessments.length;
      await createAssessment(context, knex, {
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

  const studentList = await Student.query(knex);
  for (let i = 0; i < studentList.length * 4; i++) {
    await createStudentSubject(context, knex, {
      studentIdNumber: studentList[i % studentList.length].idNumber,
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

  const schoolList = await School.query(knex).context(context);
  for (let i = 0; i < teachers.length * 4; i++) {
    await createSchoolTeacher(context, knex, {
      schoolId: schoolList[i % schoolList.length].suuid,
      teacherIdNumber: teachers[i % teachers.length].idNumber,
      active: false,
    });
  }

  const grades = ['8', '9', '10', '11', '12'];
  for (let i = 0; i < grades.length; i++) {
    await createGrade(context, knex, {
      name: grades[i]
    })
  }

  const gradeList = await Grade.query(knex).context(context);
  for (let i = 0; i < schoolList.length; i++) {
    for (let j = 0; j < grades.length; j++) {
      await createSchoolGrade(context, knex, {
          gradeId: gradeList[j].id,
          schoolId: schoolList[i].suuid
      })
    }
  }

  const assessmentResultList = await AssessmentResult.query(knex).context(context);
  for (let i = 0; i < studentList.length; i++) {
    for (let j = 0; j < assessmentResultList.length; j++) {
      await createStudentAssessmentResult(context, knex, {
        studentIdNumber: studentList[i].idNumber,
        assessmentResultId: assessmentResultList[j].id
      })
    }
  }
}
