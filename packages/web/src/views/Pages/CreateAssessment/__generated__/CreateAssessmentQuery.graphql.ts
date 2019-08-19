/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
type CreateAssessment_viewer$ref = any;
export type CreateAssessmentQueryVariables = {};
export type CreateAssessmentQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": CreateAssessment_viewer$ref;
    };
};
export type CreateAssessmentQuery = {
    readonly response: CreateAssessmentQueryResponse;
    readonly variables: CreateAssessmentQueryVariables;
};



/*
query CreateAssessmentQuery {
  viewer {
    ...CreateAssessment_viewer
    id
  }
}

fragment CreateAssessment_viewer on Viewer {
  assessments {
    kind
    chapters {
      name
    }
    id
  }
  ...modal_schools
}

fragment modal_schools on Viewer {
  schools {
    edges {
      node {
        name
        id
        grades {
          name
          id
        }
      }
    }
  }
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
    "name": "CreateAssessmentQuery",
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
            "name": "CreateAssessment_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateAssessmentQuery",
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
            "name": "assessments",
            "storageKey": null,
            "args": null,
            "concreteType": "Assessment",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "kind",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "chapters",
                "storageKey": null,
                "args": null,
                "concreteType": "Chapter",
                "plural": true,
                "selections": [
                  (v0/*: any*/)
                ]
              },
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
                      (v1/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "grades",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Grade",
                        "plural": true,
                        "selections": [
                          (v0/*: any*/),
                          (v1/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CreateAssessmentQuery",
    "id": null,
    "text": "query CreateAssessmentQuery {\n  viewer {\n    ...CreateAssessment_viewer\n    id\n  }\n}\n\nfragment CreateAssessment_viewer on Viewer {\n  assessments {\n    kind\n    chapters {\n      name\n    }\n    id\n  }\n  ...modal_schools\n}\n\nfragment modal_schools on Viewer {\n  schools {\n    edges {\n      node {\n        name\n        id\n        grades {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '4a8ee4248813d132dc42425ad0fdfee8';
export default node;
