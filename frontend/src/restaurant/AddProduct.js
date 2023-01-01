import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  isAuthenticated,
  createaProduct,
} from "../apicalls/restaurantapicalls";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    price: "",
    loading: false,
    error: "",
    description: "",
    createdProduct: "",
    formData: new FormData(),
  });
  const { name, price, loading, error, description, createdProduct, formData } =
    values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          price: "",
          description: "",
          category: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4 className="text-capitalize">{createdProduct} added successfully</h4>
    </div>
  );

  const errorMessage = () => {
    if (error) {
      return <h4 className="alert alert-danger text-center">{error}</h4>;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="aler alert-info text-center blink_me">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const createProductForm = () => (
    <form className="text-dark">
      Name:
      <div className="form-group">
        <input
          maxlength="32"
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name (max: 32 charcters)"
          value={name}
        />
      </div>
      Price:
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      Description:
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          maxlength="200"
          placeholder="Description"
          value={description}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-block btn-outline-success mb-3 mt-4"
      >
        Add Item
      </button>
    </form>
  );
  formData.append("userId", user._id);
  formData.append("userName", user.name);

  return (
    <>
      <div className="p-3">
        <Link to="/admin/dashboard" className="btn btn-md btn-primary mb-3">
          Go Back
        </Link>
      </div>
      <div className="container">
        <h4 className="text-dark text-center">Add Item Details</h4>
        <div className="row  text-white rounded">
          <div className="col-md-8 offset-md-2">
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {createProductForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
