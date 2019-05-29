import Context from '../../context';
import Knex from 'knex';
import {SchoolGrade} from '../../models';

export const createSchoolGrade = async (
  context: Context,
  trx: Knex,
  {
    gradeId,
  }: {
    gradeId: number;
  }
): Promise<SchoolGrade> => {
  return await SchoolGrade.query(trx)
    .context(context)
    .insert({
      gradeId,
    });
};
