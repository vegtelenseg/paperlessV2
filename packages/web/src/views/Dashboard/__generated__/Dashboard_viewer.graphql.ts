/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type Schools_viewer$ref = any;
export type Dashboard_viewer$ref = any;
export type Dashboard_viewer = {
    readonly " $fragmentRefs": Schools_viewer$ref;
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
      "kind": "FragmentSpread",
      "name": "Schools_viewer",
      "args": null
    }
  ]
};
(node as any).hash = '1d25e9d4e4599de30b1596842a9859da';
export default node;
