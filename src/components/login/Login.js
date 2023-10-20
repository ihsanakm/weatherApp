import React, { useState } from 'react';
import '../login/login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "Arthur" && password === "123") {
      // Successful login
      onLogin(username);
    } else {
      // Unsuccessful login
      setLoginError(true);
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>LOGIN</h3>
              <p>Please enter your credentials to login.</p>
            </div>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
          {loginError && <p className="error-message">Invalid username or password</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
