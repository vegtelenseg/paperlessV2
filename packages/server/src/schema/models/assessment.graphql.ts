import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt, GraphQLString} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import { globalIdField } from 'graphql-relay';

export const Assessment = newJoinMonsterGraphQLObjectType({
  name: 'Assessment',
  sqlTable: 'assessment',
  description: 'Keeps information about an assessment',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Assessment'),
    totalMarks: {
      description: 'The score allocated to the entire assessment',
      type: GraphQLInt,
      sqlColumn: 'total_marks',
    },
    kind: {
      type: GraphQLString,
      description: `The type of assessment (e.g. 'Class Test', 'Project', 'Assignment', and etc.`,
      sqlColumn: 'kind',
    },
    startDate: {
      description: 'The day the assessment will be taken',
      type: GraphQLDate,
      sqlColumn: 'start_date',
    },
    endDate: {
      description:
        'The day the assessment will be submitted to the teacher. Null for one day-long assessments',
      type: GraphQLDate,
      sqlColumn: 'end_date',
    },
  }),
});
