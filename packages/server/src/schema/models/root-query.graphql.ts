import {GraphQLObjectType, GraphQLResolveInfo, GraphQLList} from 'graphql';
import {Student} from './Student.graphql';
import Context from '../../context';
import dbCall from '../dbCall';
import {Teacher} from './Teacher.graphql';
//import {Subject} from './Subject.graphql';
import {School} from './School.graphql';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    student: {
      type: new GraphQLList(Student),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    teacher: {
      type: new GraphQLList(Teacher),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    // subjects: {
    //   type: new GraphQLList(Subject),
    //   resolve: (
    //     parent: any,
    //     args: {[key: string]: any},
    //     context: Context,
    //     resolveInfo: GraphQLResolveInfo
    //   ) => dbCall(parent, args, context, resolveInfo),
    // },
    school: {
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
