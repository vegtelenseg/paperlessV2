//@ts-ignore
import {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
//@ts-ignore
import {GraphQLDate} from 'graphql-iso-date';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Instructor} from './Instructor.graphql';

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
    instructor: {
      type: new GraphQLList(Instructor),
      junction: {
        sqlTable: 'school_instructor',
        sqlJoins: [
          (schoolTable, junctionTable) =>
            `${schoolTable}.suuid = ${junctionTable}.school_id`,
          (junctionTable, instructor) =>
            `${junctionTable}.instructor_id_number = ${instructor}.id_number`,
        ],
      },
    },
  }),
});
