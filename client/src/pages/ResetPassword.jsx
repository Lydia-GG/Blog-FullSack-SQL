import React, { useState } from 'react';

const ResetPassword = () => {
  const [verified, setVerified] = useState(false);
  return (
    <div>
      <h1>Forgot Password</h1>
      <span>Enter your email address</span>
      <form>
        <input type="text" placeholder="Enter email address" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
