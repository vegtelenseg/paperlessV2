import Context from '../../context';
import Knex from 'knex';
import {SchoolGrade} from '../../models';

export const createSchoolGrade = async (
  context: Context,
  trx: Knex,
  {
    schoolId,
    gradeId,
  }: {
    schoolId: string;
    gradeId: number;
  }
): Promise<SchoolGrade> => {
  return await SchoolGrade.query(trx)
    .context(context)
    .insert({
      schoolId,
      gradeId,
    });
};
