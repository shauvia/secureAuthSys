import { useState } from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import './App.css'

function App() {
  const [isSignIn, setIsSignIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleSwitchForm = () => {
    setIsSignIn(!isSignIn)
  }

  const handleLogout = () => {
    setUser(null)
    setIsSignIn(false)
  }

  if (user) {
    return (
      <div className="container user-container">
        <div className="welcome-card">
          <h1>{user.message}</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="form-container">
        {isSignIn ? (
          <SignIn onSuccess={setUser} onSwitch={handleSwitchForm} />
        ) : (
          <SignUp onSuccess={setUser} onSwitch={handleSwitchForm} />
        )}
      </div>
    </div>
  )
}

export default App
