/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type school_viewer$ref = any;
export type school_viewer = {
    readonly name: string;
    readonly registeredDate: any;
    readonly " $refType": school_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "school_viewer",
  "type": "School",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
(node as any).hash = '8dd0758ce99eb82c8c995a9856e46014';
export default node;
