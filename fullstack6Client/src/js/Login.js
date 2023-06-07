import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'; // import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add a state variable to track loading state
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading indicator
      setLoading(true);

      const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);

      if (!response.ok) {
        // Handle network errors
        throw new Error('Network error');
      }

      const users = await response.json();
      const user = users[0];

      if (user && password === user.address.geo.lat.slice(-4)) {
        localStorage.setItem('user', JSON.stringify(user));
        history('/application');
      } else {
        // Handle API errors
        throw new Error('Invalid login credentials');
      }
    } catch (error) {
      // Show error message to user
      alert(`Error: ${error.message}`);
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button> {/* Update button text based on loading state */}
      </form>
    </div>
  );
}

export default Login;