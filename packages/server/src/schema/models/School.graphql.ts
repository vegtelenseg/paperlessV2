//@ts-ignore
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} from 'graphql';
//@ts-ignore
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
//import {Teacher} from './Teacher.graphql';
import {Grade} from './grade.graphql';
import {Student} from './student.graphql';
import {globalIdField, connectionDefinitions} from 'graphql-relay';
import {nodeInterface} from '../Relay';
import {forwardConnectionArgs} from 'graphql-relay';

const {connectionType: ViewerStudentConnection} = connectionDefinitions({
  name: 'ViewerStudentConnection',
  nodeType: Student,
  connectionFields: {
    total: {type: GraphQLInt},
  },
});
export const School = newJoinMonsterGraphQLObjectType({
  name: 'School',
  sqlTable: 'school',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('School'),
    name: {
      type: GraphQLString,
      sqlColumn: 'name',
    },
    active: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'active',
    },
    registeredDate: {
      type: GraphQLDate,
      sqlColumn: 'registered_date',
    },
    grades: {
      type: GraphQLNonNull(new GraphQLList(Grade)),
      junction: {
        sqlTable: 'school_grade',
        sqlJoins: [
          (schoolTable, junctionTable) =>
            `${schoolTable}.id = ${junctionTable}.school_id`,
          (junctionTable, gradeTable) =>
            `${junctionTable}.grade_id = ${gradeTable}.id`,
        ],
      },
    },
    students: {
      type: ViewerStudentConnection,
      args: {
        id: {
          type: GraphQLID,
        },
        ...forwardConnectionArgs,
      },
      sqlPaginate: true,
      orderBy: {
        first_name: 'desc',
      },
      junction: {
        sqlTable: 'school_student',
        sqlJoins: [
          (schoolTable, junctionTable) =>
            `${schoolTable}.id = ${junctionTable}.school_id`,
          (junctionTable, student) =>
            `${junctionTable}.student_id = ${student}.id`,
        ],
      },
    },
  }),
  interfaces: [nodeInterface],
});
