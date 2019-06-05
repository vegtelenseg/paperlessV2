import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';

import RootQuery from './models/root-query.graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: new GraphQLNonNull(RootQuery),
      resolve: () => ({}),
    },
  }),
});

export default new GraphQLSchema({
  query,
});
