import {GraphQLObjectType, GraphQLResolveInfo, GraphQLList} from 'graphql';
import Context from '../../context';
import dbCall from '../dbCall';
import {Province} from './province.graphql';
import {Assessment} from './assessment.graphql';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    provinces: {
      type: new GraphQLList(Province),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    assessments: {
      type: new GraphQLList(Assessment),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
  }),
});
