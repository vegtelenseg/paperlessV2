import {GraphQLNonNull, GraphQLString} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';

// TODO: Add description and commitment
export const Chapter = newJoinMonsterGraphQLObjectType({
  name: 'Chapter',
  sqlTable: 'chapter',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'description',
    },
    contribution: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'contribution',
    },
    // totalMarks: {
    //   type: GraphQLNonNull(new GraphQLList(StudentAssessmentChapterMark)),
    //   sqlJoin: (chapterTable, studentAssessmentChapterTable) =>
    //   `${chapterTable}.id = ${studentAssessmentChapterTable}.chapter_id`
    // }
  }),
});
