/* tslint:disable no-any */
import React from "react";

import styles from "./Error.module.css";

import { failedToReachServer } from "../../errors";

interface Props {
  error: Error;
  retry: (() => void) | null;
}

function mapErrorMessage(error: Error) {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    return [failedToReachServer, "ERROR:FETCH-FAILED"];
  } else if (error.name === "RRNLRetryMiddlewareError") {
    if (error.message.startsWith("Wrong response status")) {
      return [failedToReachServer, "ERROR:MULTIPLE_FAILURES"];
    } else if (error.message.startsWith("Reached request timeout in ")) {
      return [failedToReachServer, "ERROR:TIMEOUT"];
    }
  }

  return [error.message, "ERROR:GENERAL_ERROR"];
}

const ErrorDisplay = ({ error, retry }: Props) => {
  const [message, code] = mapErrorMessage(error);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong!</div>
      <div className={styles.text}>{message}</div>
      {process.env.NODE_ENV === "development" && (
        <div className={styles.stack}>Stacktrace: {error.stack}</div>
      )}
      <br />
      <div className={styles.code}>Code: {code}</div>
      {retry && (
        <div className={styles.buttonContainer}>
          <button value="RETRY" onClick={() => retry()} />
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;
