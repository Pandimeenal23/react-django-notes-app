import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

 function handleSubmit(event) {
  event.preventDefault();

  // Check password
  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch("http://127.0.0.1:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      toast.success("Registration Successful!");

      setTimeout(() => {
  window.location.href = "/login";
}, 1000);
    })
    .catch((error) => {
      console.error(error);
    });
}

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <p className="login-subtitle">
          Create your account to manage your notes securely.
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

        <p className="register-text">
          Already have an account?
          <Link to="/login" className="register-link">
            {" "}Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Register;