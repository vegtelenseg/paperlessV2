/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type school_viewer$ref = any;
export type RoutesQueryVariables = {};
export type RoutesQueryResponse = {
    readonly viewer: {
        readonly schools: ReadonlyArray<{
            readonly " $fragmentRefs": school_viewer$ref;
        } | null> | null;
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
      ...school_viewer
      id
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
            "concreteType": "School",
            "plural": true,
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
            "concreteType": "School",
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
  },
  "params": {
    "operationKind": "query",
    "name": "RoutesQuery",
    "id": null,
    "text": "query RoutesQuery {\n  viewer {\n    schools {\n      ...school_viewer\n      id\n    }\n  }\n}\n\nfragment school_viewer on School {\n  name\n  registeredDate\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'ca8cb8987544b936869109b0a3b1969d';
export default node;
