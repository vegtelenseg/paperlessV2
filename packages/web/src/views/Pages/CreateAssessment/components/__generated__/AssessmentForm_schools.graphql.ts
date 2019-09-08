/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type AssessmentForm_schools$ref = any;
export type AssessmentForm_schools = {
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
                    } | null>;
                } | null>;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": AssessmentForm_schools$ref;
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "AssessmentForm_schools",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
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
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "subjects",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Subject",
                      "plural": true,
                      "selections": [
                        (v1/*: any*/),
                        (v0/*: any*/)
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
(node as any).hash = '4b1e3cbaeb529ac00b30a78f6395ca63';
export default node;
