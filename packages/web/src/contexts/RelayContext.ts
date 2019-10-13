import * as React from "react";
import { Environment } from "relay-runtime";

export type RelayState = Environment;

// @ts-ignore
export default React.createContext<RelayState>(null);
