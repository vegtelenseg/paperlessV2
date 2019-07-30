/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Dashboard_viewer$ref = any;
export type DashboardQueryVariables = {};
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
query DashboardQuery {
  viewer {
    ...Dashboard_viewer
    id
  }
}

fragment Dashboard_viewer on Viewer {
  ...Schools_viewer
}

fragment Schools_viewer on Viewer {
  schools {
    edges {
      node {
        id
        name
        registeredDate
        ...School_school
      }
    }
  }
}

fragment School_school on School {
  id
  name
  registeredDate
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "DashboardQuery",
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
                      (v0/*: any*/),
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
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v0/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "DashboardQuery",
    "id": null,
    "text": "query DashboardQuery {\n  viewer {\n    ...Dashboard_viewer\n    id\n  }\n}\n\nfragment Dashboard_viewer on Viewer {\n  ...Schools_viewer\n}\n\nfragment Schools_viewer on Viewer {\n  schools {\n    edges {\n      node {\n        id\n        name\n        registeredDate\n        ...School_school\n      }\n    }\n  }\n}\n\nfragment School_school on School {\n  id\n  name\n  registeredDate\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '326ba50c880279cb96cacf3c3dfd565b';
export default node;
