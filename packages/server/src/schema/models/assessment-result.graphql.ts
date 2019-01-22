import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

export const AssessmentResult = newJoinMonsterGraphQLObjectType({
  name: 'AssessmentResult',
  sqlTable: 'assessment_result',
  uniqueKey: 'id',
  fields: {
    assessmentId: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'assessment_id',
      sqlJoin: (assessmentResultTable, assessmentTable) =>
        `${assessmentResultTable}.assessment_id = ${assessmentTable}.id`,
    },
    results: {
      type: GraphQLNonNull(GraphQLFloat),
      sqlColumn: 'results',
    },
    percentage: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  },
});
