/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type AssessmentForm_schools$ref = any;
export type CreateAssessment_viewer$ref = any;
export type CreateAssessment_viewer = {
    readonly assessments: ReadonlyArray<{
        readonly kind: string | null;
        readonly chapters: ReadonlyArray<{
            readonly name: string;
        }> | null;
    } | null> | null;
    readonly " $fragmentRefs": AssessmentForm_schools$ref;
    readonly " $refType": CreateAssessment_viewer$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CreateAssessment_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "assessments",
      "storageKey": null,
      "args": null,
      "concreteType": "Assessment",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "kind",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "chapters",
          "storageKey": null,
          "args": null,
          "concreteType": "Chapter",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "AssessmentForm_schools",
      "args": null
    }
  ]
};
(node as any).hash = '118986bc60cd7f8d6a187eae288a773a';
export default node;
