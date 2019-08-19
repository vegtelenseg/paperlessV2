/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type modal_schools$ref = any;
export type modal_schools = {
    readonly schools: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name: string | null;
                readonly id: string;
                readonly grades: ReadonlyArray<{
                    readonly name: string;
                } | null>;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": modal_schools$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "modal_schools",
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
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "grades",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Grade",
                  "plural": true,
                  "selections": [
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
};
})();
(node as any).hash = '839ce9395e1e19c3a89c53c817dab022';
export default node;
