import {BaseModel} from './base';
import {Student} from './student';
import {Assessment} from '.';
import {Chapter} from './chapter';

export class StudentAssessmentChapter extends BaseModel {
  public chaperId!: number;
  public studentId!: string;
  public chapterMark!: number;

  static get relationMappings() {
    return {
      assessment: {
        relation: BaseModel.HasManyRelation,
        modelClass: Assessment,
        join: {
          from: 'studentAssessmentChapter.assessmentId',
          to: 'assessment.id',
        },
      },
      student: {
        relation: BaseModel.HasManyRelation,
        modelClass: Student,
        join: {
          from: 'studentAssessmentChapter.studentId',
          to: 'student.id',
        },
      },
      chapter: {
        relation: BaseModel.HasManyRelation,
        modelClass: Chapter,
        join: {
          from: 'studentAssessmentChapter.chapterId',
          to: 'chapter.id',
        },
      },
    };
  }
}
