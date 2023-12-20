import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from './components';
import { LoginPage } from './pages';

const App = () => {
  const {isAuthenticated, loginWithRedirect, user, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    loginWithRedirect();
    return <LoginPage />;
  }

  return (
    <div>
      <h1>App</h1>
      <LogoutButton />
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default App;
