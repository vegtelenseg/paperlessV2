/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type School_school$ref = any;
export type School_school = {
    readonly id: string;
    readonly name: string | null;
    readonly registeredDate: any | null;
    readonly " $refType": School_school$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "School_school",
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
(node as any).hash = '1fc91646d5c9ce1a35ebaf36d18a8bef';
export default node;
