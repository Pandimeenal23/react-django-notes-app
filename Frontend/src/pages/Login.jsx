import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
  const access = localStorage.getItem("access");

  if (access) {
    navigate("/home");
  }
}, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
  event.preventDefault();

  fetch("http://127.0.0.1:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
  console.log(data);

  if (data.access) {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    toast.success("Login Successful!");
    setTimeout(() => {
  navigate("/home");
}, 800);
  } else {
    toast.error(data.error);
  }
})
.catch((error) => {
  console.log(error);
  toast.error("Something went wrong!")
});
  
}

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Access your notes securely</h2>
        <p className="login-subtitle">
          Sign in to continue managing your notes.
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit" >
          Login
        </button>

       <p className="register-text">
         Don't have an account?
         <Link to="/register" className="register-link">
           Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;