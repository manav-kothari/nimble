import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createCategory,
  isAuthenticated,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [rank, setRank] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const userId = user._id;

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="alert alert-success text-center">
          Category created successfully!
        </h4>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger align-center">
          Failed! to create Category
        </h4>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-center">Enter the category name:</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handlechange}
            value={name}
            autoFocus
            required
            placeholder="Ex. Burger"
          />
          <div className="form-group my-2">
            <label htmlFor="">Rank:</label>
            <select
              onChange={handleChangeRank}
              value={rank}
              className="form-control"
              placeholder="Rank"
            >
              <option>Select Ranking</option>

              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>
          <button
            onClick={onSubmit}
            className="btn btn-md btn-outline-success btn-block"
          >
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const goBack = () => {
    return (
      <Link className="btn btn-md btn-dark my-2" to="/admin/dashboard">
        Go Back
      </Link>
    );
  };

  const handlechange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const handleChangeRank = (event) => {
    setError("");
    setRank(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name, rank, userId }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  return (
    <>
      <Menu />
      <div className="page page3">
        <div className="p-3">{goBack()}</div>
        <div className="container p-4">
          <h4 className="text-dark text-center">Create a new category</h4>
          <div className="row bg-light rounded ">
            <div className="col-md-8 offset-md-2">
              {successMessage()}
              {errorMessage()}
              {myCategoryForm()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
