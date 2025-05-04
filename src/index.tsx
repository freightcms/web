import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { CarrierPage, CreateCarrierPage } from "./features/carriers";
import App from "./App";
import { HomePage } from "./pages";

// see https://www.apollographql.com/docs/react/get-started
//
// for developer testing add https://www.apollographql.com/docs/react/development-testing/developer-tooling#apollo-client-devtools
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

// we recommend wrapping this statement in a check for e.g. process.env.NODE_ENV === "development"
if (process.env.NODE_ENV === "development") {
  const devtoolsRegistration = connectApolloClientToVSCodeDevTools(
    client,
    // the default port of the VSCode DevTools is 7095
    "ws://localhost:7095",
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="carriers" element={<CarrierPage />} />
            <Route path="carriers/new" element={<CreateCarrierPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
