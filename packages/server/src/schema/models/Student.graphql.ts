import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import { newJoinMonsterGraphQLObjectType } from '../../utils/joinMonster-graphql14.fix';

export const Student = newJoinMonsterGraphQLObjectType({
  name: 'Student',
  sqlTable: 'student',
  uniqueKey: 'id_number',
  fields: () => ({
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'first_name',
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'last_name',
    },
    birthDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'birth_date',
    },
    gender: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'gender',
    },
    contactPhone: {
      type: GraphQLString,
      sqlColumn: 'contact_phone',
    },
    contactMobile: {
      type: GraphQLString,
      sqlColumn: 'contact_mobile',
    },
    contactMail: {
      type: GraphQLString,
      sqlColumn: 'contact_mail',
    },
    grade: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'grade',
    },
    enrolmentDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'enrolment_date',
    },
  }),
});
