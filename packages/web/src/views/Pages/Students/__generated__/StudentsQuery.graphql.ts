/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type StudentsQueryVariables = {
    readonly id: string;
};
export type StudentsQueryResponse = {
    readonly node: ({
        readonly name?: string | null;
        readonly registeredDate?: any | null;
        readonly students?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly firstName: string;
                    readonly lastName: string;
                    readonly grade: number;
                    readonly dateEnrolled: any | null;
                    readonly studentResults: ReadonlyArray<{
                        readonly score: number | null;
                        readonly subject: string | null;
                    } | null> | null;
                } | null;
            } | null> | null;
        } | null;
    } & ({
        readonly name: string | null;
        readonly registeredDate: any | null;
        readonly students: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly firstName: string;
                    readonly lastName: string;
                    readonly grade: number;
                    readonly dateEnrolled: any | null;
                    readonly studentResults: ReadonlyArray<{
                        readonly score: number | null;
                        readonly subject: string | null;
                    } | null> | null;
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
      registeredDate
      students {
        edges {
          node {
            id
            firstName
            lastName
            grade
            dateEnrolled
            studentResults {
              score
              subject
              id
            }
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
  "name": "registeredDate",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "firstName",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastName",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "grade",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "dateEnrolled",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "score",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "subject",
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
              (v3/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "studentResults",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Results",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v10/*: any*/)
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
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "School",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "studentResults",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Results",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v4/*: any*/)
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "StudentsQuery",
    "id": null,
    "text": "query StudentsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on School {\n      name\n      registeredDate\n      students {\n        edges {\n          node {\n            id\n            firstName\n            lastName\n            grade\n            dateEnrolled\n            studentResults {\n              score\n              subject\n              id\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '1bf0135b585442ec337fd33408c3c367';
export default node;
