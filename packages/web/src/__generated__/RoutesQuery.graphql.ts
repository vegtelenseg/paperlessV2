/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type school_viewer$ref = any;
export type RoutesQueryVariables = {};
export type RoutesQueryResponse = {
    readonly viewer: {
        readonly schools: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": school_viewer$ref;
                } | null;
            } | null> | null;
        } | null;
    };
};
export type RoutesQuery = {
    readonly response: RoutesQueryResponse;
    readonly variables: RoutesQueryVariables;
};



/*
query RoutesQuery {
  viewer {
    schools {
      edges {
        node {
          ...school_viewer
          id
        }
      }
    }
  }
}

fragment school_viewer on School {
  name
  registeredDate
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoutesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
            "args": null,
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
                      {
                        "kind": "FragmentSpread",
                        "name": "school_viewer",
                        "args": null
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
    "name": "RoutesQuery",
    "argumentDefinitions": [],
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
            "args": null,
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
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
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
    "name": "RoutesQuery",
    "id": null,
    "text": "query RoutesQuery {\n  viewer {\n    schools {\n      edges {\n        node {\n          ...school_viewer\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment school_viewer on School {\n  name\n  registeredDate\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '20e63d8cdd72e98268364a0726ab7ba9';
export default node;
