/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Students_viewer$ref = any;
export type Students_viewer = {
    readonly firstName: string;
    readonly lastName: string;
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "lastName",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '5a12c3bee7b12cf11fdc45ad42c3f9f9';
export default node;
