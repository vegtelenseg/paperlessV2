import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {School} from './school.graphql';
import {GraphQLObjectType, GraphQLList} from 'graphql/type/definition';
import {Subject} from './subject.graphql';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../Relay';

export const Teacher: GraphQLObjectType = newJoinMonsterGraphQLObjectType({
  name: 'Teacher',
  sqlTable: 'teacher',
  uniqueKey: 'id_number',
  fields: () => ({
    id: globalIdField('Teacher'),
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
    subjects: {
      type: new GraphQLList(Subject),
      junction: {
        sqlTable: 'subject_teacher',
        sqlJoins: [
          (teacherTable, junctionTable) =>
            `${teacherTable}.id_number = ${junctionTable}.teacher_id_number`,
          (junctionTable, subject) =>
            `${junctionTable}.subject_id = ${subject}.id`,
        ],
      },
    },
    school: {
      type: School,
      junction: {
        sqlTable: 'school_teacher',
        sqlJoins: [
          (teacherTable, junctionTable) =>
            `${teacherTable}.id_number = ${junctionTable}.teacher_id_number`,
          (junctionTable, schooldTable) =>
            `${junctionTable}.school_id = ${schooldTable}.id`,
        ],
      },
    },
  }),
  interfaces: [nodeInterface],
});
