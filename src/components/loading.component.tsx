export interface LoadingSpinnerProps {
  /**
   * A bold header message to show under the loading spinner.
   * Typically useful for when loading table results or an entire page of
   * information
   */
  header?: string;
  /**
   * Small amount of text to be displayed and explain to the user about what
   * is being loaded, or if something is taking longer than expected
   */
  message?: string;
}
/**
 * Loading component for showing a spinner to the user
 * This should be used when the user is waiting to receive results on a table
 * or searching for text in a input
 */
export const LoadingSpinner = ({ header, message }: LoadingSpinnerProps) => (
  <div>
    <span>Spinner goes here</span>
    <div>
      {header ? <h4>{header}</h4> : null}
      {message ? <p>{message}</p> : null}
    </div>
  </div>
);
