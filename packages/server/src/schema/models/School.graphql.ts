//@ts-ignore
import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
//@ts-ignore
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
//import {Teacher} from './Teacher.graphql';
import {Grade} from './grade.graphql';

export const School = newJoinMonsterGraphQLObjectType({
  name: 'School',
  sqlTable: 'school',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    active: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'active',
    },
    registeredDate: {
      type: GraphQLNonNull(GraphQLDate),
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
    // teachers: {
    //   type: new GraphQLList(Teacher),
    //   junction: {
    //     sqlTable: 'school_teacher',
    //     sqlJoins: [
    //       (schoolTable, junctionTable) =>
    //         `${schoolTable}.id = ${junctionTable}.school_id`,
    //       (junctionTable, teacher) =>
    //         `${junctionTable}.teacher_id_number = ${teacher}.id_number`,
    //     ],
    //   },
    // },
  }),
});
