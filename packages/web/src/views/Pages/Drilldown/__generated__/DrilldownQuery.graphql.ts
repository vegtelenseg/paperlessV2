/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DrilldownQueryVariables = {
    readonly id: string;
};
export type DrilldownQueryResponse = {
    readonly node: ({
        readonly firstName?: string;
        readonly lastName?: string;
        readonly grade?: number;
        readonly results?: ReadonlyArray<{
            readonly score: number | null;
            readonly assessment: {
                readonly kind: string | null;
                readonly chapters: ReadonlyArray<{
                    readonly name: string;
                    readonly maxScore: number | null;
                }> | null;
            } | null;
        } | null> | null;
    } & ({
        readonly firstName: string;
        readonly lastName: string;
        readonly grade: number;
        readonly results: ReadonlyArray<{
            readonly score: number | null;
            readonly assessment: {
                readonly kind: string | null;
                readonly chapters: ReadonlyArray<{
                    readonly name: string;
                    readonly maxScore: number | null;
                }> | null;
            } | null;
        } | null> | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    })) | null;
};
export type DrilldownQuery = {
    readonly response: DrilldownQueryResponse;
    readonly variables: DrilldownQueryVariables;
};



/*
query DrilldownQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on Student {
      firstName
      lastName
      grade
      results {
        score
        assessment {
          kind
          chapters {
            name
            maxScore
          }
          id
        }
        id
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grade",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "score",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "kind",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "chapters",
  "storageKey": null,
  "args": null,
  "concreteType": "Chapter",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "maxScore",
      "args": null,
      "storageKey": null
    }
  ]
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DrilldownQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "type": "Student",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "results",
                "storageKey": null,
                "args": null,
                "concreteType": "StudentResult",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "assessment",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Assessment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DrilldownQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Student",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "results",
                "storageKey": null,
                "args": null,
                "concreteType": "StudentResult",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "assessment",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Assessment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ]
                  },
                  (v8/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "DrilldownQuery",
    "id": null,
    "text": "query DrilldownQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Student {\n      firstName\n      lastName\n      grade\n      results {\n        score\n        assessment {\n          kind\n          chapters {\n            name\n            maxScore\n          }\n          id\n        }\n        id\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '667f14d464401b7228bfc78e0d7b4ea7';
export default node;
