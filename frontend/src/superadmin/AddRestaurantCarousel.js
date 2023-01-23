import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createaCarousel,
  isAuthenticated,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const AddRestaurantCarousel = () => {
  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  const [values, setValues] = useState({
    name: "",
    photo: "",
    loading: false,
    error: "",
    createdCarousel: "",
    getaRedirect: false,
    formData: "",
    formData: new FormData(),
  });

  const { name, loading, error, createdCarousel, getaRedirect, formData } =
    values;

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(),
    });
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaCarousel(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
          loading: false,
          createdCarousel: data.name,
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
      style={{ display: createdCarousel ? "" : "none" }}
    >
      <h4>{createdCarousel} created successfully</h4>
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

  const createCarouselForm = () => (
    <form>
      <span className="text-dark">Add photo:</span>
      <div className="form-group">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-md btn-outline-success mb-3"
      >
        Add Image
      </button>
    </form>
  );
  formData.append("userId", userId);
  return (
    <>
      <Menu />
      <div className="p-3 page3 ">
        <Link
          to="/superadmin/restaurants"
          className="btn btn-md btn-primary mb-3"
        >
          Go Back
        </Link>
      </div>
      <div className="container page">
        <h4 className="text-dark text-center">Add a new Carousel Image</h4>
        <div className="row  text-white rounded">
          <div className="col-md-8 offset-md-2">
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {createCarouselForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRestaurantCarousel;
