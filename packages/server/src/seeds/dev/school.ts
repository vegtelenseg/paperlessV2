import Context from '../../context';
import Knex from 'knex';
import {School} from '../../models/school';

export const createSchool = async (
  context: Context,
  trx: Knex,
  {
    name,
    active,
    registeredDate,
    id,
  }: {
    name: string;
    active: boolean;
    registeredDate: Date;
    id: string;
  }
): Promise<School> => {
  return await School.query(trx)
    .context(context)
    .insertGraph({
      name,
      active,
      registeredDate,
      id,
    });
};
