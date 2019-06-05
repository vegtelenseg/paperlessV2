import Context from '../../context';
import Knex from 'knex';
import {Province} from '../../models';

export const createProvince = async (
  context: Context,
  trx: Knex,
  {
    name,
  }: {
    name: string;
  }
): Promise<Province> => {
  return await Province.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      name,
    });
};
