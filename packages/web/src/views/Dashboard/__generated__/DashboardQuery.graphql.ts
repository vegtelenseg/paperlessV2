/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Dashboard_viewer$ref = any;
export type DashboardQueryVariables = {
    readonly count: number;
    readonly cursor?: string | null;
};
export type DashboardQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": Dashboard_viewer$ref;
    };
};
export type DashboardQuery = {
    readonly response: DashboardQueryResponse;
    readonly variables: DashboardQueryVariables;
};



/*
query DashboardQuery(
  $count: Int!
  $cursor: String
) {
  viewer {
    ...Dashboard_viewer
    id
  }
}

fragment Dashboard_viewer on Viewer {
  ...Schools_schools_1G22uz
}

fragment Schools_schools_1G22uz on Viewer {
  schools(first: $count, after: $cursor) {
    edges {
      node {
        id
        name
        registeredDate
        ...School_school
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

fragment School_school on School {
  id
  name
  registeredDate
  ...Students_students
}

fragment Students_students on School {
  id
  name
  registeredDate
  students {
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
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hasNextPage",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DashboardQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Dashboard_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DashboardQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "schools",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "ViewerSchoolConnectionConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ViewerSchoolConnectionEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "School",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                        "args": null,
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
                              (v3/*: any*/),
                              (v4/*: any*/)
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
                                  (v2/*: any*/),
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
                                  (v5/*: any*/)
                                ]
                              },
                              (v6/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "students",
                        "args": null,
                        "handle": "connection",
                        "key": "Students_students",
                        "filters": null
                      },
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
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
                  (v4/*: any*/),
                  (v3/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "schools",
            "args": (v1/*: any*/),
            "handle": "connection",
            "key": "Schools_schools",
            "filters": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "DashboardQuery",
    "id": null,
    "text": "query DashboardQuery(\n  $count: Int!\n  $cursor: String\n) {\n  viewer {\n    ...Dashboard_viewer\n    id\n  }\n}\n\nfragment Dashboard_viewer on Viewer {\n  ...Schools_schools_1G22uz\n}\n\nfragment Schools_schools_1G22uz on Viewer {\n  schools(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        name\n        registeredDate\n        ...School_school\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment School_school on School {\n  id\n  name\n  registeredDate\n  ...Students_students\n}\n\nfragment Students_students on School {\n  id\n  name\n  registeredDate\n  students {\n    total\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      node {\n        ...Student_student\n        id\n        firstName\n        lastName\n        grade\n        dateEnrolled\n        studentResults {\n          score\n          subject\n        }\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment Student_student on Student {\n  id\n  firstName\n  lastName\n  grade\n  dateEnrolled\n  studentResults {\n    score\n    subject\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8d109128d636b14eb640df07ed28fa05';
export default node;
