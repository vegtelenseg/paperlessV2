import Context from '../../context';
import Knex from 'knex';
import {AssessmentResult} from '../../models/assessment-result';

export const createAssessmentResult = async (
  context: Context,
  trx: Knex,
  {
    assessmentId,
    results,
    percentage,
  }: {
    assessmentId: number;
    results: number;
    percentage: number;
  }
): Promise<AssessmentResult> => {
  return await AssessmentResult.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      assessmentId,
      results,
      percentage,
    });
};
