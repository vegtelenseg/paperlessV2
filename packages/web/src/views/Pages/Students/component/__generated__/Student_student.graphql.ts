/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type Student_student$ref = any;
export type Student_student = {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly grade: number;
    readonly dateEnrolled: any | null;
    readonly studentResults: ReadonlyArray<{
        readonly score: number | null;
        readonly subject: string | null;
    } | null> | null;
    readonly " $refType": Student_student$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Student_student",
  "type": "Student",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "grade",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "dateEnrolled",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "studentResults",
      "storageKey": null,
      "args": null,
      "concreteType": "Results",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "score",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "subject",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'a673b68ece85142f66a431ff5a8ba3ad';
export default node;
