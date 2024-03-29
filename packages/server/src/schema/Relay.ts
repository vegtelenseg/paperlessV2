import {nodeDefinitions, fromGlobalId} from 'graphql-relay';
import Context from '../context';
import joinMonster from 'join-monster';
import {knex} from '../db';
import options from './dbOptions';

const whereClause = (type: string, id: number) => {
  switch (type) {
    case 'School':
      return (table: string) => `(${table}.id = ${id})`;
    case 'Student':
      return (table: string) => `(${table}.id = ${id})`;
    default:
      return;
  }
};

const {nodeField, nodeInterface} = nodeDefinitions<Context>(
  // resolve the ID to an object
  (globalId, context, resolveInfo) => {
    // parse the globalID
    const {type, id} = fromGlobalId(globalId);
    console.log('TYPE ID: ', type, id);
    // pass the type name and other info. `joinMonster` will find the type from the name and write the SQL
    // @ts-ignore
    return joinMonster.getNode(
      type,
      resolveInfo,
      context,
      whereClause(type, parseInt(id, 10)),
      async (sql: string) => {
        const data = await knex.raw(sql);
        return data;
      },
      options
    );
  },
  // determines the type. Join Monster places that type onto the result object on the "__type__" property
  (obj) => obj.__type__
);

export {nodeInterface, nodeField};
