import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {School} from './school.graphql';

// TODO: Add description and commitment
export const Province = newJoinMonsterGraphQLObjectType({
  name: 'Province',
  sqlTable: 'province',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    schools: {
      type: GraphQLNonNull(new GraphQLList(School)),
      sqlJoin: (provinceTable, schoolTable) =>
        `${provinceTable}.id = ${schoolTable}.province_id`,
    },
  }),
});
