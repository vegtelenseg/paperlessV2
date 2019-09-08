/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type Schools_schools$ref = any;
export type Dashboard_viewer$ref = any;
export type Dashboard_viewer = {
    readonly " $fragmentRefs": Schools_schools$ref;
    readonly " $refType": Dashboard_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Dashboard_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count",
      "type": null
    },
    {
      "kind": "RootArgument",
      "name": "cursor",
      "type": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Schools_schools",
      "args": [
        {
          "kind": "Variable",
          "name": "count",
          "variableName": "count"
        },
        {
          "kind": "Variable",
          "name": "cursor",
          "variableName": "cursor"
        }
      ]
    }
  ]
};
(node as any).hash = '461dedcf8deb82b6f3b29ff839fb19a6';
export default node;
