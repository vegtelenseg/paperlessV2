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
    provinceId,
  }: {
    name: string;
    active: boolean;
    registeredDate: Date;
    provinceId: number;
  }
): Promise<School> => {
  return await School.query(trx)
    .context(context)
    .upsertGraph({
      name,
      active,
      registeredDate,
      provinceId,
    });
};
