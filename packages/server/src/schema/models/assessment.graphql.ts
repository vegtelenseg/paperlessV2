import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt, GraphQLString} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';

export const Assessment = newJoinMonsterGraphQLObjectType({
  name: 'Assessment',
  sqlTable: 'assessment',
  uniqueKey: 'id',
  fields: () => ({
    totalMarks: {
      type: GraphQLInt,
      sqlColumn: 'total_marks',
    },
    kind: {
      type: GraphQLString,
      description: `The type of assessment (e.g. 'Class Test', 'Project', 'Assignment', and etc.`,
      sqlExpr: (assessmentTable) => `(select kind from assessment
        left join assessment_chapter on
        assessment_chapter.assessment_id = ${assessmentTable}.id
        where assessment_chapter.chapter_id = chapter.id
       )`,
    },
    startDate: {
      type: GraphQLDate,
      sqlColumn: 'start_date',
    },
    endDate: {
      type: GraphQLDate,
      sqlColumn: 'end_date',
    },
  }),
});
