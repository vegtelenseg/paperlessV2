/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type school_viewer$ref = any;
export type Dashboard_viewer$ref = any;
export type Dashboard_viewer = {
    readonly schools: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": school_viewer$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": Dashboard_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Dashboard_viewer",
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
};
(node as any).hash = 'da21a51a27e6d5f9e981de0f20624d7e';
export default node;
