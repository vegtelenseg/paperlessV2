import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Assessment} from './assessment.graphql';

export const Chapter = newJoinMonsterGraphQLObjectType({
  name: 'Chapter',
  sqlTable: 'chapter',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    totalMarks: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'total_marks',
    },
    assessments: {
      type: new GraphQLList(Assessment),
      junction: {
        sqlTable: 'assessment_chapter',
        sqlJoins: [
          (chapterTable, junctionTable) =>
            `${chapterTable}.id = ${junctionTable}.chapter_id`,
          (junctionTable, assessmentTable) =>
            `${junctionTable}.assessment_id = ${assessmentTable}.id`,
        ],
      },
    },
  }),
});
