import Context from '../../context';
import Knex from 'knex';
import {SchoolTeacher} from '../../models';

export const createSchoolTeacher = async (
  context: Context,
  trx: Knex,
  {
    teacherIdNumber,
    schoolId,
    active,
  }: {
    teacherIdNumber: string;
    schoolId: number;
    active: boolean;
  }
): Promise<SchoolTeacher> => {
  return await SchoolTeacher.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      teacherIdNumber,
      schoolId,
      active,
    });
};
