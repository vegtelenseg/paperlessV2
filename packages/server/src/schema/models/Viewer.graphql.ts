import {GraphQLObjectType, GraphQLResolveInfo, GraphQLList} from 'graphql';
import {Student} from './Student.graphql';
import Context from '../../context';
import dbCall from '../dbCall';
import {Instructor} from './Instructor.graphql';
import {Subject} from './Subject.graphql';
import {School} from './school.graphql';

export default new GraphQLObjectType({
  name: 'Viewer',
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
    instructor: {
      type: new GraphQLList(Instructor),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
    subject: {
      type: new GraphQLList(Subject),
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
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
