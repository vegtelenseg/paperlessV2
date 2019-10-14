import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

//import {CreateAssessmentMutation} from './__generated__/CreateAssessmentMutation.graphql'
import { Environment } from 'relay-runtime';

const mutation = graphql`
  mutation CreateAssessmentMutation($input: CreateAssessmentInput!) {
    createAssessment(input: $input) {
      clientMutationId
    }
  }
`;

export const createAssessment = (environment: Environment, variables) => {
  console.log("FE: ", variables);
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (a) => alert("Mutation Completed: " + a),
    onError: (error) => console.log("Mutation Error: ", error)
  })
}
