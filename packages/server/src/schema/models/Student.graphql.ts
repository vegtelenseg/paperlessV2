import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
//import {Subject} from './Subject.graphql';
import {Assessment} from './assessment.graphql';
import {StudentResult} from './student-results.graphql';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../Relay';

export const Student = newJoinMonsterGraphQLObjectType({
  name: 'Student',
  sqlTable: 'student',
  uniqueKey: 'id_number',
  // @ts-ignore
  fields: () => ({
    id: globalIdField('Student'),
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
    results: {
      type: new GraphQLList(StudentResult),
      sqlJoin: (studentTable) => `(${studentTable}.id = results.student_id)`,
    },
    assessments: {
      type: GraphQLNonNull(new GraphQLList(Assessment)),
      junction: {
        sqlTable: 'student_result',
        sqlJoins: [
          (studentTable, junctionTable) =>
            `${studentTable}.id = ${junctionTable}.student_id`,
          (junctionTable, assessmentChapterTable) =>
            `${junctionTable}.assessment_chapter_id = ${assessmentChapterTable}.id`,
        ],
      },
    },
  }),
  interfaces: [nodeInterface],
});
