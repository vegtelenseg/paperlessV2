/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateAssessmentInput = {
    readonly totalScore?: number | null;
    readonly kind?: string | null;
    readonly startDate?: any | null;
    readonly endDate?: any | null;
    readonly clientMutationId?: string | null;
};
export type CreateAssessmentMutationVariables = {
    readonly input: CreateAssessmentInput;
};
export type CreateAssessmentMutationResponse = {
    readonly createAssessment: {
        readonly clientMutationId: string | null;
    } | null;
};
export type CreateAssessmentMutation = {
    readonly response: CreateAssessmentMutationResponse;
    readonly variables: CreateAssessmentMutationVariables;
};



/*
mutation CreateAssessmentMutation(
  $input: CreateAssessmentInput!
) {
  createAssessment(input: $input) {
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateAssessmentInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createAssessment",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateAssessmentPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "clientMutationId",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateAssessmentMutation",
    "type": "Mutations",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateAssessmentMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateAssessmentMutation",
    "id": null,
    "text": "mutation CreateAssessmentMutation(\n  $input: CreateAssessmentInput!\n) {\n  createAssessment(input: $input) {\n    clientMutationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '981bec49e181995db3d82a4c5d755315';
export default node;
