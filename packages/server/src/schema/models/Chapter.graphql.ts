import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export const Chapter = new GraphQLObjectType({
  name: 'Chapter',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    totalMarks: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'total_marks',
    },
  }),
});

// @ts-ignore
Chapter._typeConfig = {
  uniqueKey: 'id',
  sqlTable: 'chapter',
};
