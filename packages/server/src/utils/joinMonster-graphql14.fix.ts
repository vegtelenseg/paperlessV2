import {GraphQLObjectTypeConfig} from 'graphql';
import {ThunkWithArgsCtx, GraphQLObjectType} from 'graphql/type/definition';

interface OnlyJMGraphQLObjectTypeConfig<C> {
  alwaysFetch?: string;
  sqlTable?: ThunkWithArgsCtx<string, any, C>;
  uniqueKey?: string | string[];
  [key: string]: any;
}

/** MonkeyPatching GraphQLObjectType Constructor to give join monster access to config */

export function newJoinMonsterGraphQLObjectType<S, C>(
  objectTypeConfig: GraphQLObjectTypeConfig<S, C>
) {
  const joinMonsterConfig: OnlyJMGraphQLObjectTypeConfig<C> = {};
  const joinMonsterKeys = ['sqlTable', 'uniqueKey', 'alwaysFetch'];
  joinMonsterKeys.forEach((key) => {
    if (key in objectTypeConfig) {
      // @ts-ignore
      joinMonsterConfig[key] = objectTypeConfig[key];
    }
  });

  // call original constructor
  const GraphQLObject: any = new GraphQLObjectType(objectTypeConfig);
  // patch config
  GraphQLObject._typeConfig = joinMonsterConfig;

  return GraphQLObject;
}
