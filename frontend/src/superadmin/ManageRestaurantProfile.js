import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { isAuthenticated, getAUser } from "../apicalls/restaurantapicalls";
import { Link, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { updateUserBySuperAdmin } from "../apicalls/superadminapicalls";

const ManageRestaurantProfile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    role: "",
    error: "",
    loading: false,
    success: false,
  });

  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  const preload = () => {
    getAUser(userId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          name: data.name,
          email: data.email,
          number: data.number,
          role: data.role,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(userId);
    // eslint-disable-next-line
  }, []);

  const { name, email, number, error, loading, success, role } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    updateUserBySuperAdmin(userId, token, { name, email, number, role })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,

            error: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error "));
  };

  const updateForm = () => {
    return (
      <Row className=" justify-content-md-center">
        <Col xs={12} md={6} lg={3}>
          <form>
            <div className="form-group">
              <label className="text-dark">Name:</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                placeholder="Enter Name"
                value={name}
              />
            </div>

            <div className="form-group my-4">
              <label className="text-dark">Logo:</label>
              <a
                href=""
                class="btn btn-secondary btn-sm active ml-3"
                role="button"
                aria-pressed="true"
              >
                Add
              </a>
            </div>

            <div className="form-group my-2">
              <label className="text-dark">Email:</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter Email"
                value={email}
              />
            </div>

            <div className="form-group my-2">
              <label className="text-dark">Number:</label>
              <input
                onChange={handleChange("number")}
                className="form-control"
                type="number"
                value={number}
                placeholder="Enter Number"
              />
            </div>

            <div className="form-group my-2">
              <label className="text-dark">Role:</label>
              <select
                onChange={handleChange("role")}
                className="form-control"
                value={role}
                placeholder="Role"
              >
                <option>Select Role</option>

                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>

            <Row className="justify-content-md-center mx-1">
              <button
                onClick={onSubmit}
                className="text-center col-md-12 col-sm-12 btn btn-success my-4 mx-auto"
              >
                Update Details
              </button>
            </Row>
          </form>
        </Col>
      </Row>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center mt-3 ">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Account updated successfully.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row mt-3">
        <div className=" col-md-6 offset-sm-3 text-center ">
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

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row mt-3">
          <div className="col-md-6 offset-sm-3 text-center ">
            <div className="alert alert-info blink_me">Loading...</div>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <Menu />
      <div className="p-3 page3">
        <Link
          to="/superadmin/restaurants"
          className="btn btn-md btn-primary mb-3"
        >
          Go Back
        </Link>
      </div>
      <div className="px-4 py-3">
        <h1 className="headingalt text-center text-dark">
          Update Your Details
        </h1>
        {loadingMessage()}
        {successMessage()}
        {errorMessage()}
        {updateForm()}
        <span className="text-center text-bold">
          Role Explained: 0- Signed up (No Permissions), 1- Admin (Restaurant),
          2- Super Admin (All Access)
        </span>
      </div>
    </>
  );
};

export default ManageRestaurantProfile;
