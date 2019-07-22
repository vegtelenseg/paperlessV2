/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type School_viewer$ref = any;
export type Schools_viewer$ref = any;
export type Schools_viewer = {
    readonly schools: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string | null;
                readonly registeredDate: any | null;
                readonly " $fragmentRefs": School_viewer$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": Schools_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Schools_viewer",
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
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                },
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
                  "kind": "FragmentSpread",
                  "name": "School_viewer",
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
(node as any).hash = '26e496ae8ca9d3422331000d013b8f87';
export default node;
