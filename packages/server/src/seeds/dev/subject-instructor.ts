import Context from '../../context';
import Knex from 'knex';
import {SubjectInstructor} from '../../models';

export const createSubjectInstructor = async (
  context: Context,
  trx: Knex,
  {
    instructorIdNumber,
    subjectId,
  }: {
    instructorIdNumber: string;
    subjectId: number;
  }
): Promise<SubjectInstructor> => {
  return await SubjectInstructor.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      instructorIdNumber,
      subjectId,
    });
};
