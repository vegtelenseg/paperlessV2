/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Drilldown_viewer$ref = any;
export type Drilldown_viewer = {
    readonly firstName: string;
    readonly " $refType": Drilldown_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Drilldown_viewer",
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
(node as any).hash = '2516194a846618675c76cf57c02d58f7';
export default node;
