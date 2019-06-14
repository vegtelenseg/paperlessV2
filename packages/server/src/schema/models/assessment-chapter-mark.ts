import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt} from 'graphql';

export const AssessmentChapterMark = newJoinMonsterGraphQLObjectType({
  name: 'AssessmentChapterMark',
  sqlTable: 'student_assessment_chapter',
  uniqueKey: 'id',
  fields: () => ({
    totalMarks: {
      type: GraphQLInt,
      sqlColumn: 'chapter_mark',
    },
  }),
});
