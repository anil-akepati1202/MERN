import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formdata;

  const onChange = (e) =>
    setformdata({ ...formdata, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>

      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minlength="6"
            value={password}
            name="password"
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        You don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
