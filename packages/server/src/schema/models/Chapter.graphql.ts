import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';

export const Chapter = newJoinMonsterGraphQLObjectType({
  name: 'Chapter',
  sqlTable: 'chapter',
  uniqueKey: 'id',
  description: "Keeps information about a subject's chapter",
  fields: () => ({
    name: {
      description: 'The name of the Chapter',
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    description: {
      description: 'A summary about the chapter',
      type: GraphQLString,
      sqlColumn: 'description',
    },
    maxScore: {
      description:
        'The total amount of marks that the chapter contributes to the overall 100% of the subject',
      type: GraphQLInt,
      sqlColumn: 'max_score',
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
  }),
});
