/**
 * Context API used for Auth related information and methods.
 * I am keeping everything related to the authentication and PrivateRoute in this one file.
 */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { axiosInterceptors } from 'src/config/HttpInterceptor';
import { getNativeUser } from 'src/services/userServices';
import * as auth from './UserPool';

export const AuthContext = createContext();

/**
 user
   {
     "email": string,
     "isAdmin": boolean,
     "username": string,
     "userId": UUID,
     "token": string
   }
 * * */

// Context Provider to wrap the whole app within and make auth information (user) available.
export function ProvideAuth({ children }) {
  // Here are essentially the "store" for the user
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  try {
    axiosInterceptors(user);
  } catch (err) {
    console.log('interceptorErr', err);
  }
  const getCurrentUser = async () => {
    try {
      // Check for cached user data in local storage first
      const cachedUser = localStorage.getItem('cachedUser');
      if (cachedUser) {
        const curUser = JSON.parse(cachedUser);
        setUser(curUser);
      } else {
        // Fetch user data if not cached
        const awsUser = await auth.getCurrentUser();
        const nativeUser = await getNativeUser(awsUser);
        setUser(nativeUser);
        localStorage.setItem('cachedUser', JSON.stringify(nativeUser));
      }
    } catch (err) {
      localStorage.removeItem('cachedUser');
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const signIn = async (username, password) => {
    await auth.signIn(username, password);
    await getCurrentUser();
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem('cachedUser');
  };

  const signUp = async (newUsername, email, password) => {
    await auth.signUp(newUsername, email, password).then((res) => {
      setUsername(res.username); // set username state for code confirm
      // TODO: we can set user here to automatically login upon sign up successfully
    });
  };

  const authValue = {
    user, // nativeUser
    username,
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

// {
//   "sub": "cc4d35f8-f0e1-709c-27ff-1965c0e60a8f",
//     "email_verified": "true",
//     "email": "tony3529353@gmail.com",
//     "tokenId": {
//   "jwtToken": "eyJraWQiOiJRRkJZYmg0WmxzRXZcLzRuYkVDYzdnRkZVQ2VXMHBwNjU2VTBRdlFiakgrUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjYzRkMzVmOC1mMGUxLTcwOWMtMjdmZi0xOTY1YzBlNjBhOGYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2NhLWNlbnRyYWwtMV83VjVpcFpqT3giLCJjbGllbnRfaWQiOiIyMm00MjM3MXVzaDlibzRtZDBubzNyZjJpcCIsIm9yaWdpbl9qdGkiOiJhYjY4YjU0MC0wNzBhLTRiYmUtYmI5MS1kOWM1ZmVkODExYWEiLCJldmVudF9pZCI6ImI0M2FiM2FiLWQxZjUtNDYxYi04YjUxLTllZjA4ODI0MGRiMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDc2NzMwMDEsImV4cCI6MTcwNzY3NjYwMSwiaWF0IjoxNzA3NjczMDAxLCJqdGkiOiI1ZDM0YzQzZi1jYjVjLTQ2ZmItOTY2Zi0yNzFjZmRhOGJlZWQiLCJ1c2VybmFtZSI6IlRvbnlUZXN0aW5nMSJ9.Aq93jnljcGHx6w9Ov7BpO3mNaOpUtQWXwjmnusJjEKGRfoI0gSzfa9CFCVZz1JfH1jtp_MfYYL-gNtuDVptQ3-A6s2Ccb8FUyb5Y-5Uvb00MhbrqxtfAI7Lbh2Dvp7gl1t7I7-vBLkE4uaNTnhHOjiXQuchEfYRJPt3z32jgAHjXuGVQ8R1VxdUPYyC-5J84UqHT11-k1mUSucE6xGZCFOPHE4X68bflp5TkKuNkjEdJw0H_-5C3a03s_iUBQJKgxvCDBLIgxI74S7g_KNtA2hpImknYFuUk0y1meusZ-7nnmKoTFcdFqQECmaPwT_anmFgc4OmOXlL8U7JSAXMKAg",
//       "payload": {
//     "sub": "cc4d35f8-f0e1-709c-27ff-1965c0e60a8f",
//         "iss": "https://cognito-idp.ca-central-1.amazonaws.com/ca-central-1_7V5ipZjOx",
//         "client_id": "22m42371ush9bo4md0no3rf2ip",
//         "origin_jti": "ab68b540-070a-4bbe-bb91-d9c5fed811aa",
//         "event_id": "b43ab3ab-d1f5-461b-8b51-9ef088240db3",
//         "token_use": "access",
//         "scope": "aws.cognito.signin.user.admin",
//         "auth_time": 1707673001,
//         "exp": 1707676601,
//         "iat": 1707673001,
//         "jti": "5d34c43f-cb5c-46fb-966f-271cfda8beed",
//         "username": "TonyTesting1"
//   }
// },
//   "username": "TonyTesting1"
// }
