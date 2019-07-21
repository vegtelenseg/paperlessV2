import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../Relay';

// TODO: Add description and commitment
export const Drilldown = newJoinMonsterGraphQLObjectType({
  name: 'Drilldown',
  sqlTable: `(
    select
    "name",
   sum( score),
   subject_name,
   studentId
 from
   (
   select
     sum(score) as score,
     chapter."name",
     first_name,
     subject.name as subject_name,
     student.id as studentId,
     student_result.student_id
   from
     student_result
   inner join student on
     student.id = student_result.student_id
   inner join assessment_chapter on
     assessment_chapter_id = assessment_chapter.id
   inner join chapter on
     chapter.id = assessment_chapter.chapter_id
   inner join subject on
     subject.id = chapter.subject_id
   where
     student.id = student_result.student_id
     and chapter.subject_id = subject.id
   group by
     chapter."name",
     subject.name,
     first_name,
     studentId,
     subject_name,
     student_result.student_id,
     score
   order by
     chapter."name",
     subject.name,
     first_name,
     student.id,
     subject_name,
     student_result.student_id,
     score ) as t
 group by
   studentId,
   "name",
   subject_name
    )`,
  uniqueKey: 'subject_name',
  fields: () => ({
    id: globalIdField('Drilldown'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    sum: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'sum',
    },
    subjectName: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'subject_name',
    },
    studentId: {
      type: GraphQLInt,
      sqlColumn: 'studentid',
    },
  }),
  interfaces: [nodeInterface],
});
