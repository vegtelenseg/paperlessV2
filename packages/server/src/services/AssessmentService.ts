import Context from '../Context';
import {Assessment} from '../models/assessment';
import { knex } from '../db';

interface AssessmentCreate {
  school: any,
  grade: any,
  subject: any;
  kind: string;
  chapters: any[],
  totalMarks: number;
}

export class AssessmentService {
  
  public static async create(
    context: Context,
    {
      grade,
      kind,
      totalMarks
    }: AssessmentCreate
  ): Promise<any> {
    const assessment = Assessment.query(knex).context(context).insertGraphAndFetch({
      startDate: new Date(),
      endDate: new Date(),
      totalMarks,
      kind,
      grade,
    })
    return assessment;
  }
}