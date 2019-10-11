import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import registerUser from '../../services/UserService/registerUser'

export default mutationWithClientMutationId({
  name: 'RegisterUsersMutation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  mutateAndGetPayload: async (args, _context) => {

    const results = await registerUser(args)
    console.log(results)
    return {email: "sindis"};
  }
})