import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt} from 'graphql';
import {Assessment} from './assessment.graphql';
import {globalIdField} from 'graphql-relay';
import {nodeInterface} from '../Relay';

export const StudentResult = newJoinMonsterGraphQLObjectType({
  name: 'StudentResult',
  sqlTable: 'student_result',
  uniqueKey: 'id',
  // @ts-ignore
  fields: () => ({
    id: globalIdField('StudentResult'),
    score: {
      type: GraphQLInt,
      sqlColumn: 'score',
    },

    assessment: {
      type: Assessment,
      junction: {
        sqlTable: 'assessment_chapter',
        sqlJoins: [
          (studentResult, junctionTable) =>
            `${studentResult}.assessment_chapter_id = ${junctionTable}.id`,
          (junctionTable, assessmentTable) =>
            `${junctionTable}.assessment_id = ${assessmentTable}.id`,
        ],
      },
    },
  }),
  interfaces: [nodeInterface],
});
