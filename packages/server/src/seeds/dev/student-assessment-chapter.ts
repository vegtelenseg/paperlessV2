import Context from '../../context';
import Knex from 'knex';
import {StudentAssessmentChapter} from '../../models';

export const createStudentAssessmentChapter = async (
  context: Context,
  trx: Knex,
  {
    chaperId,
    studentId,
    chapterMark,
  }: {
    chaperId: number;
    studentId: string;
    chapterMark: number;
  }
): Promise<StudentAssessmentChapter> => {
  return await StudentAssessmentChapter.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      chaperId,
      studentId,
      chapterMark,
    });
};
