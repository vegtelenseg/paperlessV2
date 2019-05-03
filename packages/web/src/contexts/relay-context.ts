import * as React from 'react';
import {Environment} from 'relay-runtime';

export type RelayContextType = Environment;

// @ts-ignore
export const RelayContext = React.createContext<RelayContextType>();
