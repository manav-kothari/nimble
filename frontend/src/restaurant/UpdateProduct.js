import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  isAuthenticated,
  getProduct,
  updateProduct,
  getCategories,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const userId = user._id;

  const [values, setValues] = useState({
    name: "",
    price: "",
    loading: false,
    description: "",
    error: "",
    createdProduct: "",
    formData: "",
    categories: [],
    category: "",
  });
  const { productId } = useParams();

  const {
    name,
    price,
    categories,
    loading,
    error,
    description,
    createdProduct,
    formData,
  } = values;

  const preload = (productId, userId) => {
    getProduct(productId).then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories(userId);
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category.name,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = (userId) => {
    getCategories({ userId }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data.categories,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(productId, userId);
    // eslint-disable-next-line
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(productId, user._id, token, formData).then((data) => {
      // if (name === "" && description === "") {
      //   setValues({
      //     ...values,
      //     error: "Name and description can't be empty",
      //     success: false,
      //   });
      // }
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          category: "",
          price: "",
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
      <h4>{createdProduct} Updated successfully!</h4>
    </div>
  );

  const errorMessage = () => {
    if (error) {
      return <h4 className="alert alert-danger text-center">{error}</h4>;
    }
  };

  const loadingMessage = () => {
    return (
      <div className="aler alert-info text-center blink_me p-4 my-4">
        <h2>Loading...</h2>
      </div>
    );
  };

  const createProductForm = () => (
    <form className="text-dark">
      Name:
      <div className="form-group ">
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
          placeholder="Original Price"
          value={price}
        />
      </div>
      Category:
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
        Update Item
      </button>
    </form>
  );

  return (
    <>
      {loading ? (
        loadingMessage()
      ) : (
        <>
          <Menu />
          <div className="p-3 page3">
            <Link to="/admin/products" className="btn btn-md btn-primary mb-3">
              Go Back
            </Link>
          </div>
          <div className="container page">
            <h4 className="text-dark text-center">Update the Item</h4>
            <div className="row text-white rounded">
              <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {createProductForm()}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
