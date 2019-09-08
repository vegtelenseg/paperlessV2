/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type Students_students$ref = any;
export type School_school$ref = any;
export type School_school = {
    readonly id: string;
    readonly name: string | null;
    readonly registeredDate: any | null;
    readonly " $fragmentRefs": Students_students$ref;
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
    },
    {
      "kind": "FragmentSpread",
      "name": "Students_students",
      "args": null
    }
  ]
};
(node as any).hash = '51550d1b4f42bec73552f19247ddac6e';
export default node;
