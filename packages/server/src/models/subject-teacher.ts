import {Teacher} from './teacher';
import {Subject} from './subject';
import {BaseModel} from './base';

export class SubjectTeacher extends BaseModel {
  public teacherIdNumber!: string;
  public subjectId!: number;
  static get relationMappings() {
    return {
      teacher: {
        relation: BaseModel.HasManyRelation,
        modelClass: Teacher,
        join: {
          from: 'subjectTeacher.teacherIdNumber',
          to: 'teacher.idNumber',
        },
      },
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'subjectTeacher.subjectId',
          to: 'subject.id',
        },
      },
    };
  }
}
