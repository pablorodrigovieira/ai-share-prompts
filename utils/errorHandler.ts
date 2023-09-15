export function handleError(error: Error, from: string): void {
  // Use this to integrate with an error handler like Sentry.
  console.error(`An error occurred on ${from}, error: ${error}`);
}
