import { ApolloError } from "@apollo/client";

export const DisplayGenericError = (error: Error) => (
  <div>
    <h4>{error.name}</h4>
    <p>{error.message || "No Error Message Found"}</p>
    <pre>{error.stack}</pre>
  </div>
);

export const DisplayApolloError = (error: ApolloError) => (
  <div>
    <h4>{error.name}</h4>
    <p>{error.message}</p>
    <pre>{error.stack}</pre>
  </div>
);
