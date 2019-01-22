import Context from '../../context';
import Knex from 'knex';
import {SubjectTeacher} from '../../models';

export const createSubjectTeacher = async (
  context: Context,
  trx: Knex,
  {
    teacherIdNumber,
    subjectId,
  }: {
    teacherIdNumber: string;
    subjectId: number;
  }
): Promise<SubjectTeacher> => {
  return await SubjectTeacher.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      teacherIdNumber,
      subjectId,
    });
};
