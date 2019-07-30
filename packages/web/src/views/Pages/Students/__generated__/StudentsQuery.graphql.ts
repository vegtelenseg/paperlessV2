/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Students_students$ref = any;
export type StudentsQueryVariables = {
    readonly id: string;
    readonly count: number;
    readonly cursor?: string | null;
};
export type StudentsQueryResponse = {
    readonly node: ({
        readonly name?: string | null;
        readonly registeredDate?: any | null;
        readonly " $fragmentRefs": Students_students$ref;
    } & ({
        readonly name: string | null;
        readonly registeredDate: any | null;
        readonly " $fragmentRefs": Students_students$ref;
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
  $count: Int!
  $cursor: String
) {
  node(id: $id) {
    __typename
    ... on School {
      name
      registeredDate
      ...Students_students_1G22uz
    }
    id
  }
}

fragment Students_students_1G22uz on School {
  id
  name
  registeredDate
  students(first: $count, after: $cursor) {
    edges {
      node {
        ...Student_student
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment Student_student on Student {
  id
  firstName
  lastName
  grade
  dateEnrolled
  studentResults {
    score
    subject
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
  },
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
];
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
                "kind": "FragmentSpread",
                "name": "Students_students",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "count",
                    "variableName": "count"
                  },
                  {
                    "kind": "Variable",
                    "name": "cursor",
                    "variableName": "cursor"
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
          (v4/*: any*/),
          (v5/*: any*/),
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
                "args": (v6/*: any*/),
                "concreteType": "ViewerStudentConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ViewerStudentEdge",
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
                          (v5/*: any*/),
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
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "dateEnrolled",
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
                              }
                            ]
                          },
                          (v4/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "students",
                "args": (v6/*: any*/),
                "handle": "connection",
                "key": "Students_students",
                "filters": null
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
    "text": "query StudentsQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  node(id: $id) {\n    __typename\n    ... on School {\n      name\n      registeredDate\n      ...Students_students_1G22uz\n    }\n    id\n  }\n}\n\nfragment Students_students_1G22uz on School {\n  id\n  name\n  registeredDate\n  students(first: $count, after: $cursor) {\n    edges {\n      node {\n        ...Student_student\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Student_student on Student {\n  id\n  firstName\n  lastName\n  grade\n  dateEnrolled\n  studentResults {\n    score\n    subject\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd72ea4b7b4d586b28d209274f8d777d5';
export default node;
