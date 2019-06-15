import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {GraphQLInt, GraphQLNonNull} from 'graphql';
import {Chapter} from './Chapter.graphql';

export const StudentResult = newJoinMonsterGraphQLObjectType({
  name: 'StudentResult',
  sqlTable: 'student_result',
  uniqueKey: 'id',
  // @ts-ignore
  fields: () => ({
    score: {
      type: GraphQLInt,
      sqlColumn: 'score',
    },
    chapter: {
      type: GraphQLNonNull(Chapter),
      junction: {
        sqlTable: 'assessment_chapter',
        sqlJoins: [
          (studentResultTable, junctionTable) =>
            `${studentResultTable}.assessment_chapter_id = ${junctionTable}.id`,
          (junctionTable, chapterTable) =>
            `${junctionTable}.chapter_id = ${chapterTable}.id`,
        ],
      },
    },
  }),
});
