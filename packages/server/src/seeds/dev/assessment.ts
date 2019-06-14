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
    subjectId,
    endDate,
  }: {
    kind: string;
    totalMarks: number;
    startDate: Date;
    subjectId: number;
    endDate?: Date;
  }
): Promise<Assessment> => {
  return await Assessment.query(trx)
    .context(context)
    .insertGraph({
      kind,
      totalMarks,
      startDate,
      subjectId,
      endDate,
    });
};
