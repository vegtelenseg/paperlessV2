import {BaseModel} from './base';
import {Student} from './student';
import {CourseSession} from './course-session';
import {Status} from './status';

export class EnrolledCourse extends BaseModel {
  studentId!: number;
  courseSessionId!: number;
  statusId!: number;
  enrolmentDate!: Date;
  statusDate!: Date;
  finalGrade!: number;

  static get relationMappings() {
    return {
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'enrolledCourse.studentId',
          to: 'student.id',
        },
      },
      courseSession: {
        relation: BaseModel.HasManyRelation,
        modelClass: CourseSession,
        join: {
          from: 'enrolledCourse.courseSessionId',
          to: 'courseSession.id',
        },
      },
      status: {
        relation: BaseModel.HasManyRelation,
        modelClass: Status,
        join: {
          from: 'enrolledCourse.statusId',
          to: 'status.id',
        },
      },
    };
  }
}
