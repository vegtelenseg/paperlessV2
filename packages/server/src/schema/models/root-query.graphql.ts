import {GraphQLObjectType, GraphQLResolveInfo, GraphQLList} from 'graphql';
import {Student} from './Student.graphql';
import Context from '../../context';
import dbCall from '../dbCall';
import {Teacher} from './teacher.graphql';
import {School} from './school.graphql';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    students: {
      type: new GraphQLList(Student),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    teachers: {
      type: new GraphQLList(Teacher),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    schools: {
      type: new GraphQLList(School),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
  }),
});
