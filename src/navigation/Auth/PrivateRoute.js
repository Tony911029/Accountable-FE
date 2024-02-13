// A wrapper for <Route> that redirects to the login

import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './ProvideAuth';

// If a user tyring to access protected page, we will redirect the user to login
// If a user is logged in and trying to access login in page, we redirect user to home page
function PrivateRoute({
  children, component: Component, redirectPath = '/login', ...rest
}) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (user ? (
        <>{Component ? <Component /> : children}</>
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: location },
          }}
        />
      ))}
    />
  );
}
export default PrivateRoute;
