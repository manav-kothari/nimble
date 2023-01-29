import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import {
  isAuthenticated,
  deleteCategory,
  getCategories,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();
  const userId = user._id;

  const preload = () => {
    getCategories({ userId }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data.categories);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (productId) => {
    deleteCategory(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        setLoading(false);
      }
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info text-center blink_me p-2">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    if (error) {
      return (
        error && (
          <h4 className="alert alert-danger align-center text-center">
            Operation Failed!
          </h4>
        )
      );
    }
  };

  return (
    <>
      <Menu />
      <div className="page3">
        <div className="p-3">
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Go Back
          </Link>
          <div className="container">
            <h3 className="text-dark text-center p-2">All Categories :</h3>
            {loadingMessage()}
            {errorMessage()}
          </div>
          <Table
            striped
            bordered
            responsive
            hover
            variant="light"
            className="table-sm text-dark"
          >
            <thead className="">
              <tr className="text-center">
                <th>RANK</th>
                <th>NAME</th>
                <th>UPDATE</th>
                <th>DELETE</th>
              </tr>
            </thead>

            <tbody className="text-center text-dark">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.rank}</td>
                  <td>{category.name}</td>
                  <td>
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteThisCategory(category._id);
                          setLoading(true);
                        }
                      }}
                      className="btn btn-danger text-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
