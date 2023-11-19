import {useContext, useState} from "react"
import {AuthContext} from "../../navigation/Auth/ProvideAuth";
import {Route} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const { user, signIn } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            // We're not calling the context signIn function to update the user data in the context.
            // This will trigger a re-render of any components that use the useContext hook.
            await signIn(username, password)
            // TODO: Redirect to the app's main page or dashboard
        } catch (err) {
            setError(err.message)
        }
    }


    // TODO: If the user is logged in, redirect them to somewhere else
    if (user) {
        // Redirect to the profile page
        return <Route to="/profile" />
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}