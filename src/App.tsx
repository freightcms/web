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
      <footer>
        <nav>
          <ul>
            <h4>Built with</h4>
            <li><a href="https://icons8.com/icons">icons8</a></li>
            <li><a href="https://react.dev/">React</a></li>
            <li><a href="https://graphql.com/">GraphQL</a></li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
