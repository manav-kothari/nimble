import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  signin,
  authenticate,
  isAuthenticated,
} from "../apicalls/restaurantapicalls";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin Failed!"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        return <Navigate to="/admin/dashboard" />;
      }
    }
    // if (isAuthenticated()) return <Redirect to="/" />;
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info text-center blink_me">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Email:</label>
                <input
                  className="form-control"
                  onChange={handleChange("email")}
                  style={{ backgroundColor: "#F0F0F0" }}
                  type="email"
                  value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Password:</label>
                <input
                  onChange={handleChange("password")}
                  style={{ backgroundColor: "#F0F0F0" }}
                  className="form-control"
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-success btn-block my-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mx-auto">
          Don't have an account?{" "}
          <a href="/signup">
            <button className="btn-info">Sign Up</button>
          </a>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="p-4 page">
        <container>
          {loadingMessage()}
          {errorMessage()}
          {signInForm()}

          {performRedirect()}
        </container>
      </div>
    </>
  );
};

export default Signin;
