/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Students_students$ref = any;
export type StudentsQueryVariables = {
    readonly id: string;
    readonly count: number;
    readonly cursor?: string | null;
};
export type StudentsQueryResponse = {
    readonly students: {
        readonly " $fragmentRefs": Students_students$ref;
    } | null;
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
  students: node(id: $id) {
    __typename
    ...Students_students_1G22uz
    id
  }
}

fragment Students_students_1G22uz on School {
  id
  name
  registeredDate
  students(first: $count, after: $cursor) {
    total
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Student_student
        id
        firstName
        lastName
        grade
        dateEnrolled
        studentResults {
          score
          subject
        }
        __typename
      }
      cursor
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
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
        "alias": "students",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
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
  },
  "operation": {
    "kind": "Operation",
    "name": "StudentsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "students",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "School",
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
                "name": "registeredDate",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "students",
                "storageKey": null,
                "args": (v4/*: any*/),
                "concreteType": "ViewerStudentConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "total",
                    "args": null,
                    "storageKey": null
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
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
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
                          (v3/*: any*/),
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
                          (v2/*: any*/)
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
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "students",
                "args": (v4/*: any*/),
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
    "text": "query StudentsQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  students: node(id: $id) {\n    __typename\n    ...Students_students_1G22uz\n    id\n  }\n}\n\nfragment Students_students_1G22uz on School {\n  id\n  name\n  registeredDate\n  students(first: $count, after: $cursor) {\n    total\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ...Student_student\n        id\n        firstName\n        lastName\n        grade\n        dateEnrolled\n        studentResults {\n          score\n          subject\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment Student_student on Student {\n  id\n  firstName\n  lastName\n  grade\n  dateEnrolled\n  studentResults {\n    score\n    subject\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '89a4fd9f21b134f54cacfb3418469ccd';
export default node;
