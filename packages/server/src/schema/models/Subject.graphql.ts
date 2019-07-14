import {GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLObjectType} from 'graphql/type/definition';
import {Teacher} from './teacher.graphql';
import {Student} from './student.graphql';
import { globalIdField } from 'graphql-relay';

export const Subject: GraphQLObjectType = newJoinMonsterGraphQLObjectType({
  name: 'Subject',
  sqlTable: 'subject',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Subject'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    students: {
      type: new GraphQLList(Student),
      junction: {
        sqlTable: 'student_subject',
        sqlJoins: [
          (subjectTable, junctionTable) =>
            `${subjectTable}.id = ${junctionTable}.subject_id`,
          (junctionTable, studentTable) =>
            `${junctionTable}.student_id = ${studentTable}.id`,
        ],
      },
    },
    teacher: {
      type: Teacher,
      junction: {
        sqlTable: 'subject_teacher',
        sqlJoins: [
          (subjectTable, junctionTable) =>
            `${subjectTable}.id = ${junctionTable}.subject_id`,
          (junctionTable, teacherTable) =>
            `${junctionTable}.teacher_id_number = ${teacherTable}.id_number`,
        ],
      },
    },
  }),
});
