import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';

import {nodeField} from './Relay';
import RootQuery from './models/root-query.graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: new GraphQLNonNull(RootQuery),
      resolve: () => ({}),
    },
    node: nodeField,
  }),
});

export default new GraphQLSchema({
  query,
});
