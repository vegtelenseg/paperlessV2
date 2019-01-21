import {Request} from 'express';
import {ApolloServer} from 'apollo-server-express';
const express = require('express');
//import graphqlHTTP from 'express-graphql';
import schema from '../schema';

const app = express();
const apolloServer = new ApolloServer({
  schema,
  subscriptions: {},
  context: ({req}: {req: Request}) => {
    return req;
  },
  // TODO: disable these in future
  introspection: true,
  playground: true,
  // This allows us to easily log errors but
  // replaces a lot of the useful error logic apollo-server already does
  // formatError,
  // @ts-ignore
  // extensions: [
  //   () =>
  //     new OpentracingExtension({
  //       server: tracer,
  //       local: tracer,
  //       shouldTraceRequest: (_info: any) => {
  //         return true;
  //       },
  //     }),
  //   () => new LoggingGraphQLExtension(),
  // ],
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const port = 4000;

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
);
