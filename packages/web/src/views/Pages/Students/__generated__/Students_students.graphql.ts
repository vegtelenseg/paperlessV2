/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
type Student_student$ref = any;
export type Students_students$ref = any;
export type Students_students = {
    readonly id: string;
    readonly name: string | null;
    readonly registeredDate: any | null;
    readonly students: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentRefs": Student_student$ref;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": Students_students$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Students_students",
  "type": "School",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "students"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": null
    }
  ],
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
      "kind": "LinkedField",
      "alias": "students",
      "name": "__Students_students_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "ViewerStudentConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ViewerStudentEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Student",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Student_student",
                  "args": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '88ece308cbc45e6b143f6c51c11209e6';
export default node;
