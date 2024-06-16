import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { axiosInterceptors } from 'src/config/HttpInterceptor'
import { createNewUser, getNativeUser } from 'src/services/userServices'
import * as auth from './UserPool'

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

/**
 * Represents an authority with a specific permission.
 * @typedef {Object} Authority
 * @property {string} authority - The permission string.
 */

/**
 * Represents an Organization a user belongs to
 * @typedef {Object} Organization
 * @property {string} id - UUID
 * @property {string} orgName
 */

/**
 * Represents a user with various attributes including roles and permissions.
 * @typedef {Object} User
 * @property {string} userId - The unique identifier for the user.
 * @property {Organization} organization - The organization the user belongs to, if any.
 * @property {string} displayName - The user's display name.
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} country - The user's country.
 * @property {string} role - The user's role.
 * @property {Authority[]} authorities - A list of authorities indicating the user's permissions.
 */

export const AuthContext = createContext()

// Context Provider to wrap the whole app within and make auth information (user) available.
// TODO: Use Session storage instead of local storage (only used for dev purposes now)
export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null) // native user from db
  const [awsUser, setAwsUser] = useState(null) // user from aws
  const [role, setRole] = useState('') // native user from db
  const isFirstTime = useMemo(
    () => user === null && awsUser !== null,
    [user, awsUser]
  )
  const [isLoading, setIsLoading] = useState(true)
  try {
    axiosInterceptors(user)
  } catch (err) {
    console.log('interceptorErr', err)
  }

  /**
   * Get current authenticated user from aws
   * * */
  const getCurrentUser = async () => {
    try {
      // Fetch user data if not cached
      const nonNativeUser = await auth.getCurrentUser()
      setAwsUser(nonNativeUser)
    } catch (err) {
      localStorage.removeItem('cachedUser')
      setUser(null)
    }
  }

  /**
   * Create user payload from aws user to for post user request
   * */
  const createUserPayload = () => {
    const userPayload = {}
    userPayload.userId = awsUser.sub
    userPayload.email = awsUser?.email
    userPayload.username = awsUser?.username
    userPayload.isActive = true
    userPayload.role = role
    return userPayload
  }

  /**
   * Fetch current user
   * */
  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [])

  /**
   * If awsUser is changed, use awsUser info to find the native user from database and set the user state
   * */
  useEffect(() => {
    async function fetchLocalUser() {
      const cachedUser = localStorage.getItem('cachedUser')
      if (!cachedUser) {
        const currentUser = await getNativeUser(awsUser)
        setUser(currentUser)
        localStorage.setItem('cachedUser', JSON.stringify(currentUser))
      } else {
        setUser(JSON.parse(cachedUser))
      }
      setRole(user?.role)
      console.log('user from database', user)
    }
    fetchLocalUser()
  }, [awsUser])

  /**
   * Sign in the user
   * @param {string} username
   * @param {string} password
   * */
  const signIn = async (username, password) => {
    localStorage.clear()
    await auth.signIn(username, password)
    await getCurrentUser()

    // TODO: I think this is fundamentally flawed ???
    //  Technically anyone can pass any valid token from somewhere else
    //  and our system will still think this is a new user but HOW?
    if (isFirstTime) {
      const newUser = await createNewUser(createUserPayload(awsUser))
      setUser(newUser)
    }
  }

  /**
   * Sign out the user
   * */
  const signOut = async () => {
    await auth.signOut()
    setUser(null)
    setAwsUser(null)
    localStorage.removeItem('cachedUser')
  }

  /**
   * Sign up the user
   * @param {string} newUsername
   * @param {string} email
   * @param {string} password
   * */
  const signUp = async (newUsername, email, password) => {
    // TODO: we can set user here to automatically login upon sign up successfully
    await auth.signUp(newUsername, email, password)
  }

  const authValue = {
    user, // nativeUser
    role,
    isLoading,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
