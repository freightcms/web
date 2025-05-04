import { Outlet } from "react-router";
import { NavigationMenu } from "./components";
import "./App.css";

const Layout = () => {
  return (
    <>
      <header>
        <NavigationMenu />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
