export const failedToReachServer =
  "We were unable to reach the server, please check your internet connection and try again. If the problem persists please call the call centre on 0800 014 942.";

export function getErrorMessageFromException(
  // tslint:disable-next-line no-any
  error: Error & { extensions?: Record<string, any> }
): string {
  if (error.extensions && error.extensions.code === "INVALID_MUTATION_INPUT") {
    // Hide mapping when we have inline errors
    return "";
  } else if (
    error.message === "Failed to fetch" &&
    error.name === "TypeError"
  ) {
    return failedToReachServer + " (ERROR:FETCH-FAILED)";
  }

  return error.message;
}
