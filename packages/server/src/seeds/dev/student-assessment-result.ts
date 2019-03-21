import Context from '../../context';
import Knex from 'knex';
import {StudentAssessmentResult} from '../../models';

export const createStudentAssessmentResult = async (
  context: Context,
  trx: Knex,
  {
    studentIdNumber,
    assessmentId,
    result,
  }: {
    studentIdNumber: string;
    assessmentId: number;
    result: number;
  }
): Promise<StudentAssessmentResult> => {
  return await StudentAssessmentResult.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      studentIdNumber,
      assessmentId,
      result,
    });
};
