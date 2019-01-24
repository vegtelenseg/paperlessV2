import {GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Chapter} from './Chapter.graphql';
import {Teacher} from './Teacher.graphql';
//import { Student } from './Student.graphql';
import {GraphQLObjectType} from 'graphql/type/definition';

export const Subject: GraphQLObjectType = newJoinMonsterGraphQLObjectType({
  name: 'Subject',
  sqlTable: 'subject',
  uniqueKey: 'id',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name',
    },
    chapters: {
      type: new GraphQLList(Chapter),
      sqlJoin: (subjectTable: string, chapterTable: string) =>
        `${subjectTable}.id = ${chapterTable}.subject_id`,
    },
    teacher: {
      type: Teacher,
      junction: {
        sqlTable: 'subject_teacher',
        sqlJoins: [
          (subjectTable, junctionTable) =>
            `${subjectTable}.id = ${junctionTable}.subject_id`,
          (junctionTable, teacherTable) =>
            `${junctionTable}.teacher_id_number = ${teacherTable}.id_number`,
        ],
      },
    },
  }),
});
