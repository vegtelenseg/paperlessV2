import Context from '../../context';
import Knex from 'knex';
import {Chapter} from '../../models';

export const createChapter = async (
  context: Context,
  trx: Knex,
  {
    subjectId,
    name,
    totalMarks,
  }: {
    subjectId: number;
    name: string;
    totalMarks: number;
  }
): Promise<Chapter> => {
  return await Chapter.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      subjectId,
      name,
      totalMarks,
    });
};
