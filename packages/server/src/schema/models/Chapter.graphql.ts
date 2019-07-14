import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import { globalIdField } from 'graphql-relay';

export const Chapter = newJoinMonsterGraphQLObjectType({
  name: 'Chapter',
  sqlTable: 'chapter',
  uniqueKey: 'id',
  description: "Keeps information about a subject's chapter",
  fields: () => ({
    id: globalIdField('Chapter'),
    name: {
      description: 'The name of the Chapter',
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    description: {
      description: 'A summary about the chapter',
      type: GraphQLString,
      sqlColumn: 'description',
    },
    maxScore: {
      description:
        'The total amount of marks that the chapter contributes to the overall 100% of the subject',
      type: GraphQLInt,
      sqlColumn: 'max_score',
    }
  }),
});
