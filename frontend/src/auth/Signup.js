import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../apicalls/restaurantapicalls";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, number, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, number, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            number: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Name:</label>
                <input
                  style={{ backgroundColor: "#F0F0F0" }}
                  className="form-control"
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Email:</label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "#F0F0F0" }}
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Number:</label>
                <input
                  className="form-control"
                  style={{ backgroundColor: "#F0F0F0" }}
                  onChange={handleChange("number")}
                  type="number"
                  value={number}
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Password:</label>
                <input
                  style={{ backgroundColor: "#F0F0F0" }}
                  onChange={handleChange("password")}
                  className="form-control"
                  type="password"
                  value={password}
                />
              </div>
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mx-auto mt-4">
          Already have an account?{" "}
          <a href="/signin">
            <button className="btn-info">Sign In</button>
          </a>
        </div>
      </>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please{" "}
            <Link to="/signin">
              <button className="btn-info">Login</button>
            </Link>
          </div>
        </div>
      </div>
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

  return (
    <>
      <div className="p-4 m-0">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
      </div>
    </>
  );
};

export default Signup;
