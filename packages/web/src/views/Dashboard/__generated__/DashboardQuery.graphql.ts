/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type Dashboard_viewer$ref = any;
export type DashboardQueryVariables = {};
export type DashboardQueryResponse = {
    readonly viewer: {
        readonly provinces: ReadonlyArray<{
            readonly name: string;
        } | null> | null;
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
    provinces {
      name
      id
    }
    ...Dashboard_viewer
  }
}

fragment Dashboard_viewer on Viewer {
  schools {
    edges {
      node {
        ...school_viewer
        id
      }
    }
  }
}

fragment school_viewer on School {
  name
  registeredDate
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
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
            "kind": "LinkedField",
            "alias": null,
            "name": "provinces",
            "storageKey": null,
            "args": null,
            "concreteType": "Province",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ]
          },
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
            "name": "provinces",
            "storageKey": null,
            "args": null,
            "concreteType": "Province",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/)
            ]
          },
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
                        "name": "registeredDate",
                        "args": null,
                        "storageKey": null
                      },
                      (v1/*: any*/)
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
    "name": "DashboardQuery",
    "id": null,
    "text": "query DashboardQuery {\n  viewer {\n    provinces {\n      name\n      id\n    }\n    ...Dashboard_viewer\n  }\n}\n\nfragment Dashboard_viewer on Viewer {\n  schools {\n    edges {\n      node {\n        ...school_viewer\n        id\n      }\n    }\n  }\n}\n\nfragment school_viewer on School {\n  name\n  registeredDate\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '397a21f26b194e4060f9b1035472cbfb';
export default node;
