import Context from '../../context';
import Knex from 'knex';
import {SchoolInstructor} from '../../models';

export const createSchoolInstructor = async (
  context: Context,
  trx: Knex,
  {
    schoolId,
    instructorIdNumber,
    active,
  }: {
    schoolId: string;
    instructorIdNumber: string;
    active: boolean;
  }
): Promise<SchoolInstructor> => {
  return await SchoolInstructor.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      schoolId,
      instructorIdNumber,
      active,
    });
};
