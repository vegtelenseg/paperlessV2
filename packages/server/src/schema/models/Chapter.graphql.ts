import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { newJoinMonsterGraphQLObjectType } from '../../utils/joinMonster-graphql14.fix';

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
  }),
});
