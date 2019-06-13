import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLNonNull, GraphQLInt, GraphQLString} from 'graphql';
import {GraphQLDate} from 'graphql-iso-date';
import { AssessmentChapterMark } from './assessment-chapter-mark';
// import { Chapter } from './chapter.graphql';

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
    chapterMark: {
      type: AssessmentChapterMark,
      sqlJoin: (assessmentTable, assessmentChapterTable) => 
      `
        ${assessmentTable}.id = ${assessmentChapterTable}.assessment_id
      `
    }
    // chapters: {
    //   type: GraphQLNonNull(new GraphQLList(Chapter)),
    //   junction: {
    //     sqlTable: 'student_assessment_chapter',

    //     sqlJoins: [
    //       (assessmentTable, junctionTable) =>
    //         `${assessmentTable}.id = ${junctionTable}.assessment_id`,
    //       (junctionTable, chapterTable) =>
    //         `${junctionTable}.chapter_id = ${chapterTable}.id`,
    //     ],
    //   }
    // },
  }),
});
