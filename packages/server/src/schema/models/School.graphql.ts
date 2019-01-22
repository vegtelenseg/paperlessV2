//@ts-ignore
import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
//@ts-ignore
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Teacher} from './Teacher.graphql';

export const School = newJoinMonsterGraphQLObjectType({
  name: 'School',
  sqlTable: 'school',
  uniqueKey: 'suuid',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    isActive: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'active',
    },
    registeredDate: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'registered_date',
    },
    teachers: {
      type: new GraphQLList(Teacher),
      junction: {
        sqlTable: 'school_teacher',
        sqlJoins: [
          (schoolTable, junctionTable) =>
            `${schoolTable}.suuid = ${junctionTable}.school_id`,
          (junctionTable, teacher) =>
            `${junctionTable}.teacher_id_number = ${teacher}.id_number`,
        ],
      },
    },
  }),
});
