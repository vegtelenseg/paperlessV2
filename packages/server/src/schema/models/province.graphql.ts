import {GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {School} from './school.graphql';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../Relay';

// TODO: Add description and commitment
export const Province = newJoinMonsterGraphQLObjectType({
  name: 'Province',
  sqlTable: 'province',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Province'),
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
  interfaces: [nodeInterface],
});
