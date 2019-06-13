import {Teacher} from './teacher';
import {Subject} from './subject';
import {BaseModel} from './base';
import { Assessment } from './assessment';

export class SubjectAssessment extends BaseModel {
  public subjectId!: number;
  public assessmentId!: number;
  public teacherId!: number;

  static get relationMappings() {
    return {
      teacher: {
        relation: BaseModel.HasManyRelation,
        modelClass: Teacher,
        join: {
          from: 'subjectAssessment.teacherId',
          to: 'teacher.id',
        },
      },
      subject: {
        relation: BaseModel.HasManyRelation,
        modelClass: Subject,
        join: {
          from: 'subjectAssessment.subjectId',
          to: 'subject.id',
        },
      },

      assessment: {
        relation: BaseModel.HasManyRelation,
        modelClass: Assessment,
        join: {
          from: 'subjectAssessment.assessmentId',
          to: 'assessment.id',
        },
      },
    };
  }
}
