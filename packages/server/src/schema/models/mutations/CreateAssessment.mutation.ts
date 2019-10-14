import {mutationWithClientMutationId} from 'graphql-relay';
import { GraphQLResolveInfo, GraphQLInt, GraphQLString } from 'graphql';
import Context from '../../../Context';
import { AssessmentService } from '../../../services/AssessmentService';
import { GraphQLDate } from 'graphql-iso-date';

export default mutationWithClientMutationId({
  name: 'CreateAssessment',
  inputFields: {
    totalScore: {
      type: GraphQLInt,
    },
    kind: {
      type: GraphQLString
    },
    startDate: {
      type: GraphQLDate
    },
    endDate: {
      type: GraphQLDate
    }
  },
  outputFields: {

  },
  // @ts-ignore
  mutateAndGetPayload: async (
    data: any,
    context: Context,
    //eslint-disable-next-line no-unused-vars
    _info: GraphQLResolveInfo
  ) => {
    console.log("DATA: ", data)
    await AssessmentService.create(context, data);
    return {userId: data.userId};
  },
});
