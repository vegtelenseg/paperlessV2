import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Assessment} from './assessment.graphql';

// TODO: Add description and commitment
export const Chapter = newJoinMonsterGraphQLObjectType({
  name: 'Chapter',
  sqlTable: 'chapter',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'description',
    },
    maxPoints: {
      type: GraphQLInt,
      sqlColumn: 'max_score',
    },
    assessment: {
      type: Assessment,
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
