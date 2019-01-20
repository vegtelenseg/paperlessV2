import SqlService from '../services/SqlService';
import {fromGlobalId, nodeDefinitions} from 'graphql-relay';
import options from './dbOptions';

const {nodeField, nodeInterface} = nodeDefinitions(
  // resolve the ID to an object
  (globalId, context, resolveInfo) => {
    // parse the globalID
    const {type} = fromGlobalId(globalId);

    // if (!context.user) {
    //   // Only return data for authenticated users
    //   return null;
    // }

    // pass the type name and other info. `joinMonster` will find the type from the name and write the SQL
    // @ts-ignore
    return joinMonster.getNode(
      type,
      resolveInfo,
      context,
      (sql: string) => SqlService.raw(context as any, sql),
      options
    );
  },
  // determines the type. Join Monster places that type onto the result object on the "__type__" property
  (obj) => obj.__type__
);

export {nodeInterface, nodeField};
