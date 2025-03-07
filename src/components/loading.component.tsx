import React from "react";

export interface LoadingComponentProps {
  title?: string;
  message?: string;
}

export const LoadingComponent = ({ title, message }: LoadingComponentProps) => (
  <div title={title}>
    {message ?
      <span>{message}</span>
    : null}
  </div>
);
