import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';

export const Student = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'first_name',
      resolve: () => 'ndendedn',
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'last_name',
      resolve: () => 'ndendedn',
    },
    birthDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'birth_date',
    },
    gender: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'gender',
      resolve: () => 'ndendedn',
    },
    contactPhone: {
      type: GraphQLString,
      sqlColumn: 'contact_phone',
      resolve: () => 'ndendedn',
    },
    contactMobile: {
      type: GraphQLString,
      sqlColumn: 'contact_mobile',
      resolve: () => 'ndendedn',
    },
    contactMail: {
      type: GraphQLString,
      sqlColumn: 'contact_mail',
      resolve: () => 'ndendedn',
    },
    grade: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'grade',
      resolve: () => 'ndendedn',
    },
    enrolmentDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'enrolment_date',
      resolve: () => 'ndendedn',
    },
  }),
});

// @ts-ignore
Student._typeConfig = {
  sqlTable: 'student',
  uniqueKey: 'id_number',
};
