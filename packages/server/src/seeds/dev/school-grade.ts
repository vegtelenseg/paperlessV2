import Context from '../../context';
import Knex from 'knex';
import {SchoolGrade} from '../../models';

export const createSchoolGrade = async (
  context: Context,
  trx: Knex,
  {
    gradeId,
    schoolId,
  }: {
    gradeId: number;
    schoolId: number;
  }
): Promise<SchoolGrade> => {
  return await SchoolGrade.query(trx)
    .context(context)
    .insert({
      gradeId,
      schoolId,
    });
};
