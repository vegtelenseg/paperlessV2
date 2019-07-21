import {GraphQLInt, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Drilldown} from './drilldown.graphql';

// TODO: Add description and commitment
export const Results = newJoinMonsterGraphQLObjectType({
  name: 'Results',
  sqlTable: `(
    SELECT sum(score) as score, first_name, subject.name as subject_name,
      student.id as sid, student_result.student_id
    FROM student_result
    JOIN student
    ON student.id = student_result.student_id
    JOIN assessment_chapter
    ON assessment_chapter_id = assessment_chapter.id
    JOIN chapter
    ON chapter.id = assessment_chapter.chapter_id
    JOIN subject
    ON subject.id = chapter.subject_id
    GROUP BY subject.name, first_name, sid, subject_name, student_result.student_id
    ORDER BY subject.name, first_name, sid, subject_name, student_result.student_id
  )`,
  uniqueKey: ['sid', 'subject_name'],
  fields: () => ({
    score: {
      type: GraphQLInt,
      sqlColumn: 'score',
    },
    subject: {
      type: GraphQLString,
      sqlColumn: 'subject_name',
    },
    drilldown: {
      type: new GraphQLList(Drilldown),
      where: (drilldownTable) => `
        ${drilldownTable}."studentid" = student."id"
        and ${drilldownTable}."subject_name" =  "studentRes"."subject_name"`,
      sqlJoin: (resultsTable, drilldownTable) =>
        `${resultsTable}."sid" = ${drilldownTable}."studentid"`,
    },
  }),
});
