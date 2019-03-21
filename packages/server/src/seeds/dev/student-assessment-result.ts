import Context from '../../context';
import Knex from 'knex';
import {StudentAssessmentResult} from '../../models';

export const createStudentAssessmentResult = async (
  context: Context,
  trx: Knex,
  {
    studentIdNumber,
    assessmentResultId,
  }: {
    studentIdNumber: string;
    assessmentResultId: number;
  }
): Promise<StudentAssessmentResult> => {
  return await StudentAssessmentResult.query(trx)
    .context(context)
    .upsertGraphAndFetch({
      studentIdNumber,
      assessmentResultId
    });
};
