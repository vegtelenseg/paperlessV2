import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLNonNull, GraphQLInt, GraphQLString} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';

export const Assessment = newJoinMonsterGraphQLObjectType({
  name: 'Assessment',
  sqlTable: 'assessment',
  uniqueKey: 'id',
  fields: () => ({
    totalMarks: {
      type: GraphQLNonNull(GraphQLInt),
      sqlColumn: 'total_marks',
    },
    kind: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'kind',
    },
    startDate: {
      type: GraphQLNonNull(GraphQLDate),
      sqlColumn: 'start_date',
    },
    endDate: {
      type: GraphQLDate,
      sqlColumn: 'end_date',
    },
    // chapterMark: {
    //   type: GraphQLInt,
    //   sqlExpr: (assessmentTable) => {
    //     return `
    //       (SELECT chapter_mark from student_assessment_chapter
    //       WHERE ${assessmentTable}.id = assessment_id
    //     )`
    //   }
    // },
  }),
});
