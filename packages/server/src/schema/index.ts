import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';

import {nodeField} from './Relay';
import Viewer from './models/Viewer.graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: new GraphQLNonNull(Viewer),
      resolve: () => ({}),
    },
    node: nodeField,
  }),
});

export default new GraphQLSchema({
  query,
});
