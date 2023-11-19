/**
 * Context API used for Auth related information and methods.
 * I am keeping everything related to the authentication and PrivateRoute in this one file.
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import { useProvideAuth } from './useProvideAuth';
import * as auth from "./UserPool"

// Context API used for Auth related information and methods.
export const AuthContext = createContext();

// Context Provider to wrap the whole app within and make auth information (user) available.
export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser()
      setUser(user)
    } catch (err) {
      // not logged in
      console.log(err)
      setUser(null)
    }
  }

  useEffect(() => {
    getCurrentUser()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
  }, [])

  const signIn = async (username, password) => {
    debugger
    await auth.signIn(username, password)
    await getCurrentUser()
  }
  const signOut = async () => {
    await auth.signOut()
    setUser(null)
  }

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
  }

  return (
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

// Custom hook to access auth related data and methods.
// Most important hook to be used throughout
export function useAuth() {
  return useContext(AuthContext);
}
