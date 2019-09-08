/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Drilldown_student$ref = any;
export type Drilldown_student = {
    readonly firstName: string;
    readonly " $refType": Drilldown_student$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Drilldown_student",
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
(node as any).hash = '92fae397be714be07d670aeb91f7b32b';
export default node;
