import Context from '../../context';
import Knex from 'knex';
import {Grade} from '../../models';

export const createGrade = async (
  context: Context,
  trx: Knex,
  {
    name,
  }: {
    name: string;
  }
): Promise<Grade> => {
  return await Grade.query(trx)
    .context(context)
    .insertGraph({
      name,
    });
};
