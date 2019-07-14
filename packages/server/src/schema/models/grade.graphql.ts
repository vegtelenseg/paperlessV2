import {GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Subject} from './subject.graphql';
import { globalIdField } from 'graphql-relay';

// TODO: Add description and commitment
export const Grade = newJoinMonsterGraphQLObjectType({
  name: 'Grade',
  sqlTable: 'grade',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Grade'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    subjects: {
      type: GraphQLNonNull(new GraphQLList(Subject)),
      junction: {
        sqlTable: 'subject_grade',
        sqlJoins: [
          (gradeTable, junctionTable) =>
            `${gradeTable}.id = ${junctionTable}.grade_id`,
          (junctionTable, subjectTable) =>
            `${junctionTable}.subject_id = ${subjectTable}.id`,
        ],
      },
    },
  }),
});
