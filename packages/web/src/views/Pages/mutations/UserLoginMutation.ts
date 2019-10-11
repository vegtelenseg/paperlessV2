import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Environment } from 'relay-runtime';

const mutation = graphql`
  mutation UserLoginMutation($input: UsersLoginMutationInput!) {
    loginUser(input: $input) {
      ok
      token
      refreshToken
      clientMutationId
    }
  }
`;

export const userLogin = async (environment: Environment, variables) => {
  return await commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (a) => console.log(a),
    updater: (store) => {
      const i = store.getRootField('loginUser');
      console.log("Some relay shits: ", i);
      const linked = i!.getLinkedRecord('input');
      console.log("Linked: ", linked)
    },
    onError: (error) => console.log("Mutation Error: ", error)
  });
}