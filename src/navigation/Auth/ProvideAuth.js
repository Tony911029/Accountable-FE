/**
 * Context API used for Auth related information and methods.
 * I am keeping everything related to the authentication and PrivateRoute in this one file.
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import * as auth from "./UserPool"
import {axiosInterceptors} from "../../config/HttpInterceptor"

export const AuthContext = createContext();

/**
 user
   {
     "email": string,
     "isAdmin": boolean,
     "fullName": string,
     "userId": UUID,
     "token": string
   }
 * **/

// Context Provider to wrap the whole app within and make auth information (user) available.
export function ProvideAuth({ children }) {
  // Here are essentially the "store" for the user
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  try{
    axiosInterceptors(user)
  }catch (err){
    console.log("interceptorErr", err)
  }

  const getCurrentUser = async () => {

    try {
      const data = await auth.getCurrentUser()
      const user = createUserObject(data);
      setUser(user)
      console.log("user", user)
    } catch (err) {
      setUser(null)
    }
  }


  const createUserObject = (data) => {
    let user = {}
    user.email = data.email;
    // TODO: fetch user from our backend
    user.isAdmin = false;
    user.fullName = data.username;
    user.userId = data.sub;
    user.token = data.tokenId?.jwtToken;
    return user
  }

  useEffect(() => {
    getCurrentUser()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
  }, [])

  const signIn = async (username, password) => {
    await auth.signIn(username, password)
    await getCurrentUser()
  }

  const signOut = async () => {
    await auth.signOut()
    setUser(null)
  }

  const signUp = async (username, email, password) => {
    await auth.signUp(username, email, password)
    setUsername(username);
  }

  const authValue = {
    user,
    username,
    isLoading,
    signUp,
    signIn,
    signOut,
  }

  return (
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

