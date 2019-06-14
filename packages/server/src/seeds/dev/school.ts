import Context from '../../context';
import Knex from 'knex';
import {School} from '../../models/school';
import {Grade} from '../../models';

export const createSchool = async (
  context: Context,
  trx: Knex,
  {
    name,
    active,
    registeredDate,
    provinceId,
    grades,
  }: {
    name: string;
    active: boolean;
    registeredDate: Date;
    provinceId: number;
    grades: Grade[];
  }
): Promise<School> => {
  return await School.query(trx)
    .context(context)
    .insertGraph({
      name,
      active,
      registeredDate,
      provinceId,
      grades,
    });
};
