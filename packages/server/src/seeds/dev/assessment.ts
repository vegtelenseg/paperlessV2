import Context from '../../context';
import Knex from 'knex';
import {Assessment} from '../../models';

export const createAssessment = async (
  context: Context,
  trx: Knex,
  {
    kind,
    totalMarks,
    startDate,
    endDate,
  }: {
    kind: string;
    totalMarks: number;
    startDate: Date;
    endDate?: Date;
  }
): Promise<Assessment> => {
  return await Assessment.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      kind,
      totalMarks,
      startDate,
      endDate,
    });
};
