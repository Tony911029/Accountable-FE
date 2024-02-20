/**
 * Context API used for Auth related information and methods.
 * I am keeping everything related to the authentication and PrivateRoute in this one file.
 */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { axiosInterceptors } from 'src/config/HttpInterceptor';
import { createNewUser, getNativeUser } from 'src/services/userServices';
import * as auth from './UserPool';

/**
 Design:
 - We use cognito to authenticate user => we will get awsUser/nonNativeUser
 - Use awsUser to fetch native user from db
 - if awsUser is found but nativeUser is not found, it is first time login
          => create a new user
          => re-fetch user from db again and setUser(dbUser)
 - If not first time, just let it through
 - When fetching user from our database, we first check if the user is cached
 * * */
export const AuthContext = createContext();

// Context Provider to wrap the whole app within and make auth information (user) available.
export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null); // native user from db
  const [awsUser, setAwsUser] = useState(null); // user from aws
  const [role, setRole] = useState('STUDENT'); // native user from db
  const [isLoading, setIsLoading] = useState(true);

  try {
    axiosInterceptors(user);
  } catch (err) {
    console.log('interceptorErr', err);
  }
  const getCurrenAwsUser = async () => {
    try {
      // Fetch user data if not cached
      const nonNativeUser = await auth.getCurrentUser();
      setAwsUser(nonNativeUser);
    } catch (err) {
      localStorage.removeItem('cachedUser');
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrenAwsUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  // create a new user if the user sign in for the first time
  useEffect(() => {
    async function fetchLocalUser() {
      const cachedUser = localStorage.getItem('cachedUser');
      if (!cachedUser) {
        const currentUser = await getNativeUser(awsUser);
        setUser(currentUser);
        localStorage.setItem('cachedUser', JSON.stringify(currentUser));
      } else {
        setUser(JSON.parse(cachedUser));
      }
    }
    fetchLocalUser();
  }, [awsUser]);

  const createUserPayload = () => {
    const userPayload = {};
    userPayload.userId = awsUser?.sub;
    userPayload.email = awsUser?.email;
    userPayload.username = awsUser?.username;
    userPayload.isActive = true;
    userPayload.role = role;
    return userPayload;
  };

  useEffect(() => {
    const createNewUserIfNew = async () => {
      const localUser = await getNativeUser(awsUser);
      // if this is a new user
      if (localUser === null && awsUser !== null) {
        const newUser = await createNewUser(createUserPayload());
        setUser(newUser);
      }
    };

    createNewUserIfNew();
  }, [awsUser]);

  const signIn = async (username, password) => {
    localStorage.clear();
    await auth.signIn(username, password);
    await getCurrenAwsUser();
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setAwsUser(null);
    localStorage.removeItem('cachedUser');
  };

  const signUp = async (newUsername, email, password) => {
    // TODO: we can set user here to automatically login upon sign up successfully
    await auth.signUp(newUsername, email, password);
  };

  const authValue = {
    user, // nativeUser
    role,
    setRole,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
