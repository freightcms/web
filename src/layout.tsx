import { Outlet } from "react-router";
import { NavigationMenu } from "./components";

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
