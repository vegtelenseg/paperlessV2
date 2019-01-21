import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import {Subject} from './Subject.graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';

export const Instructor = newJoinMonsterGraphQLObjectType({
  name: 'Instructor',
  sqlTable: 'instructor',
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
    employmentDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'employment_date',
    },
    subject: {
      type: new GraphQLList(Subject),
      junction: {
        sqlTable: 'subject_instructor',
        sqlJoins: [
          (instructorTable, junctionTable) =>
            `${instructorTable}.id_number = ${junctionTable}.instructor_id_number`,
          (junctionTable, subject) =>
            `${junctionTable}.subject_id = ${subject}.id`,
        ],
      },
    },
  }),
});
