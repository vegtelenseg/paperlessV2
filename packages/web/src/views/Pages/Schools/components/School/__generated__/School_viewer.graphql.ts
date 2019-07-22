/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type School_viewer$ref = any;
export type School_viewer = {
    readonly id: string;
    readonly name: string | null;
    readonly registeredDate: any | null;
    readonly " $refType": School_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "School_viewer",
  "type": "School",
  "metadata": null,
  "argumentDefinitions": [],
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
    }
  ]
};
(node as any).hash = '4a45f55f562b182d4de7eb1701e12101';
export default node;
