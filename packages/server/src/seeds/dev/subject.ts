import Context from '../../context';
import Knex from 'knex';
import {Subject} from '../../models';

export const createSubject = async (
  context: Context,
  trx: Knex,
  {
    name,
    commitment,
  }: {
    name: string;
    commitment?: string;
  }
): Promise<Subject> => {
  return Subject.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      name,
      commitment,
    });
};
