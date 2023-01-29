import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import {
  isAuthenticated,
  getProducts,
  deleteProduct,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const ManageProducts = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();
  const userId = user._id;

  const preload = (userId) => {
    getProducts(userId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    preload(userId);
  }, [userId]);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preload();
        setLoading(false);
      }
    });
  };

  const loadingMessage = () => {
    return (
      <div className="aler alert-info text-center blink_me p-4 my-4">
        <h2>Loading...</h2>
      </div>
    );
  };
  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger align-center text-center">
          Operation Failed!
        </h4>
      );
    }
  };

  return (
    <>
      {loading ? (
        loadingMessage()
      ) : error ? (
        errorMessage()
      ) : (
        <>
          <Menu />
          <div className="p-3 page3 ">
            <Link to="/admin/dashboard" className="btn btn-md btn-primary mb-3">
              Go Back
            </Link>
            <div className="container">
              <h3 className="text-dark text-center p-2">All Products :</h3>
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
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>UPDATE</th>
                  <th>DELETE</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            deleteThisProduct(product._id);
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
        </>
      )}
    </>
  );
};

export default ManageProducts;
