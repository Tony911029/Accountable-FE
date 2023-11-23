/**
 * Context API used for Auth related information and methods.
 * I am keeping everything related to the authentication and PrivateRoute in this one file.
 */
import React, {createContext, useContext, useEffect, useState} from 'react';
import * as auth from "./UserPool"

// Context API used for Auth related information and methods.
export const AuthContext = createContext();

// Context Provider to wrap the whole app within and make auth information (user) available.
export function ProvideAuth({ children }) {
  // Here are essentially the "store" for the user
  // TODO: USE redux for this
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    await auth.signIn(username, password)
    await getCurrentUser()
    setIsAuthenticated(true)
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
    isAuthenticated,
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

