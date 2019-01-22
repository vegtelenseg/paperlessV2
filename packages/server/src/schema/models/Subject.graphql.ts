import {GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import {newJoinMonsterGraphQLObjectType} from '../../utils/joinMonster-graphql14.fix';
import {Chapter} from './Chapter.graphql';
//import { Student } from './Student.graphql';

export const Subject = newJoinMonsterGraphQLObjectType({
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
  }),
});
