import joinMonster from 'join-monster';
import {GraphQLResolveInfo} from 'graphql';
import Context from '../context';

import SqlService from '../services/SqlService';
import options from './dbOptions';

export default (
  _parent: any,
  _args: {[key: string]: any},
  context: Context,
  resolveInfo: GraphQLResolveInfo
) =>
  joinMonster(
    resolveInfo,
    context,
    async (sql: string) => {
      const result = await SqlService.raw(context, sql);
      return result.rows;
    },
    options
  );
