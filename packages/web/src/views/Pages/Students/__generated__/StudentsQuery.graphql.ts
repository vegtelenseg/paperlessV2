/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type StudentsQueryVariables = {
    readonly id: string;
};
export type StudentsQueryResponse = {
    readonly node: ({
        readonly name?: string | null;
        readonly students?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly firstName: string;
                    readonly lastName: string;
                    readonly grade: number;
                } | null;
            } | null> | null;
        } | null;
    } & ({
        readonly name: string | null;
        readonly students: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly firstName: string;
                    readonly lastName: string;
                    readonly grade: number;
                } | null;
            } | null> | null;
        } | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    })) | null;
};
export type StudentsQuery = {
    readonly response: StudentsQueryResponse;
    readonly variables: StudentsQueryVariables;
};



/*
query StudentsQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on School {
      name
      students {
        edges {
          node {
            firstName
            lastName
            grade
            id
          }
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grade",
  "args": null,
  "storageKey": null
},
v6 = {
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
    "name": "StudentsQuery",
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
            "type": "School",
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "students",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewerStudentConnectionConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ViewerStudentConnectionEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Student",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ]
                      }
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
    "name": "StudentsQuery",
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
          (v6/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "School",
            "selections": [
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "students",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewerStudentConnectionConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ViewerStudentConnectionEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Student",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ]
                      }
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
  "params": {
    "operationKind": "query",
    "name": "StudentsQuery",
    "id": null,
    "text": "query StudentsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on School {\n      name\n      students {\n        edges {\n          node {\n            firstName\n            lastName\n            grade\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f259400fc971e5d7677df4e1d77b04e0';
export default node;
