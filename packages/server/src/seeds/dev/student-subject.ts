import Context from '../../context';
import Knex from 'knex';
import {StudentSubject} from '../../models';

export const createStudentSubject = async (
  context: Context,
  trx: Knex,
  {studentIdNumber, subjectId}: {studentIdNumber: string; subjectId: number}
): Promise<StudentSubject> => {
  return await StudentSubject.query(trx)
    .context(context)
    .upsertGraph({
      studentIdNumber,
      subjectId,
    });
};
