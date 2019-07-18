import * as React from "react";
import { Environment } from "relay-runtime";

export type RelayState = Environment;

// @ts-ignore
export const RelayContext = React.createContext<RelayState>(null);
