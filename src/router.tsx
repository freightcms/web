import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { ErrorPage, HomePage, LoginPage, NotFoundPage } from "./pages"

export const createRouter = () => {
    const r = createBrowserRouter([{
        Component: App,
        children: [{
            index: true,
            path: "/",
            Component: HomePage
        }, {
            path: "/login",
            Component: LoginPage,

        }, {
            path: "/not-found",
            Component: NotFoundPage,
        }, {
            path: "/error",
            Component: ErrorPage,
        }]
    }]);

    return r;
}