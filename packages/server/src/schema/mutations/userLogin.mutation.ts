import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { tryLogin } from '../../services/UserService/auth';

export default mutationWithClientMutationId({
  name: 'UsersLoginMutation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    ok: {
      type: GraphQLBoolean
    },
    token: {
      type: GraphQLString
    },
    refreshToken: {
      type: GraphQLString
    },
  },
  mutateAndGetPayload: async (args, _context) => {
    console.log(args)
    const results = await tryLogin(args, 'sdgfhdsgkfgdksfvbdskfgkdsbvfsd', 'gdsghjfgdshgfgdsfgjdsgjsdafgk')
    console.log(results)
    return results;
  }
})