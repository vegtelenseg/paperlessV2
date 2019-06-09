import Context from '../../context';
import Knex from 'knex';
import {StudentAssessmentChapter} from '../../models';

export const createStudentAssessmentChapter = async (
  context: Context,
  trx: Knex,
  {
    chapterId,
    assessmentId,
    studentId,
    chapterMark,
  }: {
    chapterId: number;
    assessmentId: number;
    studentId: number;
    chapterMark: number;
  }
): Promise<StudentAssessmentChapter> => {
  return await StudentAssessmentChapter.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      chapterId,
      assessmentId,
      studentId,
      chapterMark,
    });
};
