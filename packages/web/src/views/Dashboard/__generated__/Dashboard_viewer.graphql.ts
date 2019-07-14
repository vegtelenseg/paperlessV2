/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type school_viewer$ref = any;
export type Dashboard_viewer$ref = any;
export type Dashboard_viewer = {
    readonly schools: ReadonlyArray<{
        readonly " $fragmentRefs": school_viewer$ref;
    } | null> | null;
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
};
(node as any).hash = 'b081333d929056bbccf53a46fb297a5f';
export default node;
