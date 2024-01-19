import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { currentUser, login } = useContext(AuthContext);
  console.log(currentUser);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
    try {
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };
  console.log(currentUser);
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <span>
          <Link className="forgot" to="/register">
            Forgot password?
          </Link>
        </span>
        <button onClick={handleSubmit}>Login</button>
        {error && <p>This is an error!</p>}
        <span>
          <b>Don't have an account? </b>
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
