import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const captchaRef = useRef();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  //localhost = 127.0.0.1:3000
  const navigate = useNavigate();

  const onChange = (value) => {
    setToken(value);
    console.log('Captcha value:', value);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // captchaRef.current.reset();

    if (!token) {
      console.log('please verify the captcha');
    }

    try {
      await axios.post(`http://localhost:8000/api/auth/register`, {
        ...inputs,
        token,
      });
      // setToken('');
      captchaRef.current.reset();
      setToken('');
      navigate('/login');

      // captchaRef.current.reset();
    } catch (err) {
      setError(err.response.data);
      // setError(err);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <ReCAPTCHA
          sitekey="6LfryzMpAAAAABpbDS-BTGznCHpUELEt2e3g4fbq"
          ref={captchaRef}
          onChange={onChange}
          // style={{ transform: 'scale(0.66)', transformOrigin: '0 0' }}
          className="reCaptcha"
          // style="transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;"
          // onExpired={(e) => setToken('')
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          <b>Do you have an account? </b> <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
