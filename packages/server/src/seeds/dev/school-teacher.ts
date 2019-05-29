import Context from '../../context';
import Knex from 'knex';
import {SchoolTeacher} from '../../models';

export const createSchoolTeacher = async (
  context: Context,
  trx: Knex,
  {
    teacherIdNumber,
    active,
  }: {
    teacherIdNumber: string;
    active: boolean;
  }
): Promise<SchoolTeacher> => {
  return await SchoolTeacher.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      teacherIdNumber,
      active,
    });
};
