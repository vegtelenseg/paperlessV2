/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Students_viewer$ref = any;
export type Students_viewer = {
    readonly firstName: string;
    readonly " $refType": Students_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Students_viewer",
  "type": "Student",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "firstName",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'b165144694d4c65549fbfc64a161d9bb';
export default node;
