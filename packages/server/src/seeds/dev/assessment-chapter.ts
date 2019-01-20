import Context from '../../context';
import Knex from 'knex';
import {AssessmentChapter} from '../../models';

export const createAssessmentChapter = async (
  context: Context,
  trx: Knex,
  {assessmentId, chapterId}: {assessmentId: number; chapterId: number}
): Promise<AssessmentChapter> => {
  return AssessmentChapter.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      assessmentId,
      chapterId,
    });
};
