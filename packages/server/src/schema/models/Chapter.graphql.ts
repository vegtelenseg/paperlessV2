import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Assessment} from './assessment.graphql';

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
      type: GraphQLString,
      sqlColumn: 'description',
    },
    maxScore: {
      type: GraphQLInt,
      sqlColumn: 'max_score',
    },
    assessment: {
      type: Assessment,
      junction: {
        sqlTable: 'assessment_chapter',
        // where: () =>
        //   `(assessment_chapter.chapter_id = chapter.id)`,
        sqlJoins: [
          (chapterTable, junctionTable) =>
            `${chapterTable}.id = ${junctionTable}.chapter_id`,
          (junctionTable, assessmentTable) =>
            `${junctionTable}.assessment_id = ${assessmentTable}.id`,
        ],
      },
    },
    id: {
      type: GraphQLInt,
      description: `The type of assessment (e.g. 'Class Test', 'Project', 'Assignment', and etc.`,
      sqlExpr: (chapterTable) => `(select assessment.id from assessment
        left join assessment_chapter on
        assessment_chapter.assessment_id = assessment.id
        where assessment.chapter_id = ${chapterTable}.id
       )`,
    },
    // assessment: {
    //   type: Assessment,
    //   junction: {
    //     sqlTable: 'assessment_chapter',
    //     where: (chapterTable) =>
    //       `(assessment_chapter.chapter_id = ${chapterTable}.id)`,
    //     sqlJoins: [
    //       (chapterTable, junctionTable) =>
    //         `${chapterTable}.id = ${junctionTable}.chapter_id`,
    //       (junctionTable, assessmentTable) =>
    //         `${junctionTable}.assessment_id = ${assessmentTable}.id`,
    //     ],
    //   },
    // },
  }),
});
