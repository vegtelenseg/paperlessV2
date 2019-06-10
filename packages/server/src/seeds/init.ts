import Knex from 'knex';
//@ts-ignore
import randomDate from 'random-date-generator';
//@ts-ignore
import Fakerator from 'fakerator';

import {
  Teacher,
  Student,
  Subject,
  School,
  Grade,
  Chapter,
  Assessment,
} from '../models';
import tracer from '../tracer';
import {subjects} from './dev/subject.data';
import {generateIdNumber} from '../utils/id-generator';
import {
  createStudent,
  createTeacher,
  createSubject,
  createChapter,
  createSchool,
  createSubjectTeacher,
  createStudentSubject,
  createSchoolTeacher,
  createSchoolGrade,
  createGrade,
  createStudentAssessmentChapter,
  createAssessment,
  createSubjectGrade,
} from './dev';
import {createProvince} from './dev/province';
import {Province} from '../models/province';
import {mockAssessments} from './dev/assessment.data';

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
    'student_assessment_chapter',
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

  const subjectList = await Subject.query(knex); // Be careful, this is used in many places.
  const teachers = await Teacher.query(); // This is also being used on the school teacher table
  for (let i = 0; i < teachers.length; i++) {
    const subjectId = (i + 1) % 7;
    const teacher = teachers[i];
    const subject = subjectList.find((subject) =>
      // TODO: Fix IDs to always work
      subjectId === 0 ? subject.id === 7 : subject.id === subjectId
    );
    await createSubjectTeacher(context, knex, {
      teacherIdNumber: teacher.idNumber,
      subjectId: (subject && subject.id) || Math.floor(Math.random() * 100) % 4,
    });
  }

  for (let i = 0; i < subjects.length; i++) {
    for (let j = 0; j < subjects[i].chapters.length; j++) {
      await createChapter(context, knex, {
        name: subjects[i].chapters[j].name,
      });
    }
  }

  // TODO: Fix subject iteration
  for (let i = 0; i < subjects[0].chapters.length; i++) {
    for (let j = 0; j < subjects[0].chapters.length; j++) {
      const at = i % mockAssessments.length;
      await createAssessment(context, knex, {
        ...mockAssessments[i % mockAssessments.length],
        startDate: randomDate.getRandomDateInRange(
          mockAssessments[at].startDate,
          new Date(2019, 3, 31)
        ),
        subjectId: subjectList[i % subjectList.length].id,
        endDate: mockAssessments[at].endDate
          ? randomDate.getRandomDateInRange(
              mockAssessments[at].endDate,
              new Date(2019, 4, 31)
            )
          : undefined,
      });
    }
  }

  //const assessments = await Assessment.query(knex);

  const studentList = await Student.query(knex).context(context);
  for (let i = 0; i < studentList.length * 4; i++) {
    await createStudentSubject(context, knex, {
      studentId: studentList[i % studentList.length].id,
      subjectId: subjectList[i % subjectList.length].id,
    });
  }

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape',
  ];
  for (let i = 0; i < provinces.length; i++) {
    await createProvince(context, knex, {
      name: provinces[i],
    });
  }

  const provinceList = await Province.query(knex).context(context);
  for (let i = 0; i < provinces.length; i++) {
    for (let j = 0; j < schools.length; j++) {
      await createSchool(context, knex, {
        name: schools[j],
        registeredDate: randomDate.getRandomDateInRange(
          registeredDate.start,
          registeredDate.end
        ),
        provinceId: provinceList[i % provinceList.length].id,
        active: false,
      });
    }
  }

  const schoolList = await School.query(knex).context(context);
  for (let i = 0; i < schoolList.length * 4; i++) {
    for (let j = 0; j < teachers.length; j++) {
      await createSchoolTeacher(context, knex, {
        teacherIdNumber: teachers[j % teachers.length].idNumber,
        schoolId: schoolList[i % schoolList.length].id,
        active: false,
      });
    }
  }

  for (let i = 0; i < grades.length; i++) {
    await createGrade(context, knex, {
      name: grades[i],
    });
  }

  const gradeList = await Grade.query(knex).context(context);
  for (let i = 0; i < schoolList.length; i++) {
    for (let j = 0; j < grades.length; j++) {
      await createSchoolGrade(context, knex, {
        gradeId: gradeList[j % gradeList.length].id,
        schoolId: schoolList[i % schoolList.length].id,
      });
    }
  }

  const chapterList = await Chapter.query(knex).context(context);
  const assessmentList = await Assessment.query(knex).context(context);
  for (let i = 0; i < assessmentList.length; i++) {
    for (let j = 0; j < chapterList.length; j++) {
      await createStudentAssessmentChapter(context, knex, {
        chapterId: chapterList[j % chapterList.length].id!!,
        assessmentId: assessmentList[i % assessmentList.length].id!!,
        studentId: studentList[i % studentList.length].id!!,
        // TODO: Assign plausible chapter marks
        chapterMark: Math.floor(Math.random() * 10),
      });
    }
  }

  for (let i = 0; i < gradeList.length; i++) {
    for (let j = 0; j < subjectList.length; j++) {
      await createSubjectGrade(context, knex, {
        subjectId: subjectList[j].id,
        gradeId: gradeList[i].id,
      });
    }
  }
}
