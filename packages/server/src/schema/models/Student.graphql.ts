import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Subject} from './subject.graphql';
//import {Subject} from './Subject.graphql';

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
    subjects: {
      type: new GraphQLList(Subject),
      junction: {
        sqlTable: 'student_subject',
        sqlJoins: [
          (studentTable, junctionTable) =>
            `${studentTable}.id = ${junctionTable}.student_id`,
          (junctionTable, subject) =>
            `${junctionTable}.subject_id = ${subject}.id`,
        ],
      },
    },
  }),
});
