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
    suuid,
  }: {
    name: string;
    active: boolean;
    registeredDate: Date;
    suuid: string;
  }
): Promise<School> => {
  return await School.query(trx)
    .context(context)
    .insertGraph({
      name,
      active,
      registeredDate,
      suuid,
    });
};
