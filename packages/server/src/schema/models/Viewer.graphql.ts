import {GraphQLObjectType, GraphQLResolveInfo} from 'graphql';
import {Student} from './Student.graphql';
import Context from '../../context';
import dbCall from '../dbCall';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    student: {
      type: Student,
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => {
        dbCall(parent, args, context, resolveInfo);
      },
    },
  }),
});
