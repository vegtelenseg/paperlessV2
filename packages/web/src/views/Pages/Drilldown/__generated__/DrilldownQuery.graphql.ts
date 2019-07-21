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
        readonly studentResults?: ReadonlyArray<{
            readonly score: number | null;
            readonly subject: string | null;
            readonly drilldown: ReadonlyArray<{
                readonly name: string;
                readonly subjectName: string;
                readonly sum: number;
            } | null> | null;
        } | null> | null;
    } & ({
        readonly firstName: string;
        readonly lastName: string;
        readonly grade: number;
        readonly studentResults: ReadonlyArray<{
            readonly score: number | null;
            readonly subject: string | null;
            readonly drilldown: ReadonlyArray<{
                readonly name: string;
                readonly subjectName: string;
                readonly sum: number;
            } | null> | null;
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
      studentResults {
        score
        subject
        drilldown {
          name
          subjectName
          sum
        }
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
  "kind": "InlineFragment",
  "type": "Student",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "firstName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lastName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "grade",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "studentResults",
      "storageKey": null,
      "args": null,
      "concreteType": "Results",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "score",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "subject",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "drilldown",
          "storageKey": null,
          "args": null,
          "concreteType": "Drilldown",
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
              "name": "subjectName",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "sum",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
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
          (v2/*: any*/)
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "DrilldownQuery",
    "id": null,
    "text": "query DrilldownQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Student {\n      firstName\n      lastName\n      grade\n      studentResults {\n        score\n        subject\n        drilldown {\n          name\n          subjectName\n          sum\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '949095a1e120b753c72cbbf4ba551f26';
export default node;
