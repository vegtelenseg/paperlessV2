import { GraphQLObjectType } from "graphql";
import registerUser from './userRegistration.mutation';
import loginUser from './userLogin.mutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    registerUser,
    loginUser
  })
})