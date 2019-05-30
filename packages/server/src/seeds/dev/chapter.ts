import Context from '../../context';
import Knex from 'knex';
import {Chapter} from '../../models';

export const createChapter = async (
  context: Context,
  trx: Knex,
  {
    name,
  }: {
    name: string;
  }
): Promise<Chapter> => {
  return await Chapter.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      name,
    });
};
