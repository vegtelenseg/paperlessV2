import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { Environment } from "relay-runtime";

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
    onCompleted: () => {
      // callback()
    },
    onError: error => console.log("Mutation Error: ", error)
  });
};
