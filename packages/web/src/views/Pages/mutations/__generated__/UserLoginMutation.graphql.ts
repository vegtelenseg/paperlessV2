/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type UsersLoginMutationInput = {
    readonly email: string;
    readonly password: string;
    readonly clientMutationId?: string | null;
};
export type UserLoginMutationVariables = {
    readonly input: UsersLoginMutationInput;
};
export type UserLoginMutationResponse = {
    readonly loginUser: {
        readonly ok: boolean | null;
        readonly token: string | null;
        readonly refreshToken: string | null;
        readonly clientMutationId: string | null;
    } | null;
};
export type UserLoginMutation = {
    readonly response: UserLoginMutationResponse;
    readonly variables: UserLoginMutationVariables;
};



/*
mutation UserLoginMutation(
  $input: UsersLoginMutationInput!
) {
  loginUser(input: $input) {
    ok
    token
    refreshToken
    clientMutationId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UsersLoginMutationInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "loginUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UsersLoginMutationPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "ok",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "refreshToken",
        "args": null,
        "storageKey": null
      },
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
    "name": "UserLoginMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserLoginMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UserLoginMutation",
    "id": null,
    "text": "mutation UserLoginMutation(\n  $input: UsersLoginMutationInput!\n) {\n  loginUser(input: $input) {\n    ok\n    token\n    refreshToken\n    clientMutationId\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e70cb50096366154e6f80e41e0e85b85';
export default node;
