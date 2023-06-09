import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false); // Add a state variable to track loading state
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading indicator
      setLoading(true);

      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, phone, website }),
      });

      if (!response.ok) {
        // Handle API errors
        throw new Error('Registration failed');
      }

      // Registration successful
      history('/login');
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
    <form className="login-form registration-form" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" required />
      <div className="register-link">
      Already have an account? <Link to="/login">Login</Link>
    </div>
      <button type="submit">{loading ? 'Loading...' : 'Register'}</button> {/* Update button text based on loading state */}
    </form>
    
  </div>
);
}

export default Registration;
