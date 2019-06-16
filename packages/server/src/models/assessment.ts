import {BaseModel} from './base';
import {Subject} from './subject';
import {Teacher} from './teacher';

export class Assessment extends BaseModel {
  public totalMarks!: number;
  public kind!: string;
  public startDate!: Date;
  public endDate?: Date;
  public subjects!: Subject[];
  public teachers!: Teacher[];
  public readonly id!: number;

  public static get relationMappings() {
    return {
      subjects: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Subject,
        join: {
          from: 'assessment.id',
          through: {
            from: 'subjectAssessment.assessmentId',
            to: 'subjectAssessment.subjectId',
          },
          to: 'subject.id',
        },
      },
      teachers: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Teacher,
        join: {
          from: 'assessment.id',
          through: {
            from: 'teacherAssessment.assessmentId',
            to: 'teacherAssessment.teacherId',
          },
          to: 'teacher.id',
        },
      },
    };
  }
}
