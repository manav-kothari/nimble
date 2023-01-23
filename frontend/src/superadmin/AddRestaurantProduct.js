import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  isAuthenticated,
  createaProduct,
  getCategories,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const AddRestaurantProduct = () => {
  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  const [values, setValues] = useState({
    name: "",
    price: "",
    loading: false,
    categories: [],
    category: "",
    error: "",
    description: "",
    createdProduct: "",
    formData: new FormData(),
  });
  const {
    name,
    price,
    loading,
    categories,
    error,
    description,
    createdProduct,
    formData,
  } = values;

  const preload = () => {
    getCategories({ userId }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data.categories,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(userId); // eslint-disable-next-line
  }, []);

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
      <div className="form-group my-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
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
  formData.append("userId", userId);

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
      <div className="container page">
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

export default AddRestaurantProduct;
