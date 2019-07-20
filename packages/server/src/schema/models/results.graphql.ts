import { GraphQLInt, GraphQLString } from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {globalIdField} from 'graphql-relay';
import { nodeInterface } from '../Relay';

// TODO: Add description and commitment
export const Results = newJoinMonsterGraphQLObjectType({
  name: 'Results',
  sqlTable: `(
    select sum(score) as score, first_name, subject.name as subject_name, student.id, student_result.student_id from student_result
    inner join student
    on student.id = student_result.student_id
    inner join assessment_chapter
    on assessment_chapter_id = assessment_chapter.id
    inner join chapter
    on chapter.id = assessment_chapter.chapter_id
    inner join subject
    on subject.id = chapter.subject_id
    where student.id = student_result.student_id and chapter.subject_id = subject.id
    group by subject.name, first_name, student.id, subject_name, student_result.student_id
    order by subject.name, first_name, student.id, subject_name, student_result.student_id
  )`,
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Results'),
    score: {
      type: GraphQLInt,
      sqlColumn: 'score',
    },
    subject: {
      type: GraphQLString,
      sqlColumn: 'subject_name'
    }
  }),
  interfaces: [nodeInterface],
});
