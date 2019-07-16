import {
  GraphQLObjectType,
  GraphQLResolveInfo,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import Context from '../../context';
import dbCall from '../dbCall';
import {Province} from './province.graphql';
import {Assessment} from './assessment.graphql';
import {School} from './school.graphql';
import {connectionDefinitions, forwardConnectionArgs} from 'graphql-relay';

const {connectionType: ViewerSchoolConnection} = connectionDefinitions({
  name: 'ViewerSchoolConnection',
  nodeType: School,
  connectionFields: {
    total: {type: GraphQLInt},
  },
});

export default new GraphQLObjectType({
  name: 'Viewer',
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
    schools: {
      type: ViewerSchoolConnection,
      args: {
        ...forwardConnectionArgs,
      },
      sqlPaginate: true,
      orderBy: {
        name: 'desc',
      },
      where: (schoolTable, {id}) => {
        if (id) {
          return `${schoolTable}.id = ${id}`;
        } else {
          return `${schoolTable}.id = ${schoolTable}.id`;
        }
      },
      resolve: (
        parent: any,
        args: {[key: string]: any},
        context: Context,
        resolveInfo: GraphQLResolveInfo
      ) => dbCall(parent, args, context, resolveInfo),
    },
  }),
});
