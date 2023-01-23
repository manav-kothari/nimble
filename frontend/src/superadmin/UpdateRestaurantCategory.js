import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  updateCategory,
  getaCategory,
  isAuthenticated,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const UpdateRestaurantCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const { categoryId } = useParams();
  const [caterank, setCateRank] = useState(0);

  const [values, setValues] = useState({
    name: "",
    category: "",
    loading: false,
    error: "",
    categoryId: "",
    createdCategory: "",
    createdCategoryRank: "",
    getaRedirect: false,
    rank: "",
  });

  const { name, rank, loading, error, createdCategory, createdCategoryRank } =
    values;

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          rank: data.rank,
          categoryId: categoryId,
        });
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, loading: true });
    preload(categoryId); // eslint-disable-next-line
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCategory(user._id, token, { name, rank: caterank }, categoryId).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            error: "",
            name: "",
            rank: "",
            loading: false,
            createdCategory: data.name,
            createdCategoryRank: data.rank,
          });
        }
      }
    );
  };

  const handleChange = (event) => {
    setValues({ ...values, error: "", name: event.target.value });
  };

  const handleChangeRank = (event) => {
    setCateRank(event.target.value);
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3 "
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4 className="text-capitalize">
        {createdCategory} of Rank {createdCategoryRank} - Updated successfully!
      </h4>
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

  const updateCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead text-center">Enter the category name:</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Enter category name"
          />
          <span className="text-dark my-2">Rank: {rank}</span>
          <div className="form-group my-2">
            <label className="text-dark my-2">Select New Rank:</label>
            <select
              onChange={handleChangeRank}
              value={caterank}
              className="form-control"
              placeholder="Rank"
            >
              <option>Select Ranking</option>

              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
            </select>
          </div>
          <button
            onClick={onSubmit}
            className="btn btn-md btn-outline-success btn-block"
          >
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="page">
      {loading ? (
        loadingMessage()
      ) : (
        <>
          <Menu />
          <div className="p-3 page3 page2">
            <Link
              to="/superadmin/restaurants"
              className="btn btn-md btn-dark mb-3"
            >
              Go Back
            </Link>
          </div>
          <div className="container">
            <h4 className="text-dark text-center">Update the Category</h4>
            <div className="row text-white rounded">
              <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {updateCategoryForm()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateRestaurantCategory;
