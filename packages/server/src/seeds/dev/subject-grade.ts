import Context from '../../context';
import Knex from 'knex';
import {SubjectGrade} from '../../models/subject-grade';

export const createSubjectGrade = async (
  context: Context,
  trx: Knex,
  {
    subjectId,
    gradeId,
  }: {
    subjectId: number;
    gradeId: number;
  }
): Promise<SubjectGrade> => {
  return await SubjectGrade.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      subjectId,
      gradeId,
    });
};
