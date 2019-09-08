/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CreateAssessment_viewer$ref = any;
export type CreateAssessment_viewer = {
    readonly assessments: ReadonlyArray<{
        readonly kind: string | null;
        readonly chapters: ReadonlyArray<{
            readonly name: string;
        }> | null;
    } | null> | null;
    readonly schools: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name: string | null;
                readonly id: string;
                readonly grades: ReadonlyArray<{
                    readonly name: string;
                    readonly subjects: ReadonlyArray<{
                        readonly id: string;
                        readonly name: string;
                        readonly chapters: ReadonlyArray<{
                            readonly name: string;
                        } | null> | null;
                    } | null>;
                } | null>;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": CreateAssessment_viewer$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "CreateAssessment_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
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
                (v2/*: any*/),
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
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "subjects",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Subject",
                      "plural": true,
                      "selections": [
                        (v2/*: any*/),
                        (v0/*: any*/),
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
    }
  ]
};
})();
(node as any).hash = '91cc5b4ff9c8b4059a511ea11cbaaf65';
export default node;
