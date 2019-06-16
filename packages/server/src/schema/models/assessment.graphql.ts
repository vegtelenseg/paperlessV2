import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt, GraphQLString} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';

export const Assessment = newJoinMonsterGraphQLObjectType({
  name: 'Assessment',
  sqlTable: 'assessment',
  uniqueKey: 'id',
  fields: () => ({
    totalMarks: {
      type: GraphQLInt,
      sqlColumn: 'total_marks',
    },
    kind: {
      type: GraphQLString,
      sqlColumn: 'kind',
    },
    startDate: {
      type: GraphQLDate,
      sqlColumn: 'start_date',
    },
    endDate: {
      type: GraphQLDate,
      sqlColumn: 'end_date',
    },
  }),
});
