import React, { useState, useEffect } from "react";
import { getUsers } from "../apicalls/restaurantapicalls";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import ManageMenuCard from "../components/ManageMenuCard";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

export default function ManageRestaurants({ match }) {
  const [products, setProducts] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAllProduct = () => {
    getUsers().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.users);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    loadAllProduct();
  }, []);

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
      <Menu />
      <div className="page3">
        <Link
          to="/superadmin/dashboard"
          className="btn btn-md btn-primary mb-3 ml-4"
        >
          Go Back
        </Link>
        <h2 className="text-primary text-center pt-2 pb-1 text-weight-bold heading text-capitalize">
          All Restaurants
        </h2>

        {loading ? (
          <>
            <Container className="p-5 my-5">
              <Spinner
                animation="border"
                role="status"
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  display: "block",
                  color: "black",
                }}
              ></Spinner>
            </Container>
          </>
        ) : error ? (
          errorMessage()
        ) : (
          <>
            <Table
              striped
              bordered
              responsive
              hover
              variant="light"
              className="table-sm text-dark"
            >
              <thead className="text-capitalize">
                <tr className="text-center ">
                  <th>Restaurant Name</th>
                  <th>Orders</th>
                  <th>Categories</th>
                  <th>Products</th>
                  <th>Profile</th>
                  <th>Carousel</th>
                  <th>Menu</th>
                  <th>Delete All Data</th>
                </tr>
              </thead>

              <tbody className="text-center text-dark">
                {products.map((res) => (
                  <tr key={res._id}>
                    <td>{res.name}</td>
                    <td>
                      <Link to={`/superadmin/orders/${res._id}`}>
                        <span className="btn btn-success text-capitalize">
                          View
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="btn btn-warning text-capitalize"
                        to={`/superadmin/category/${res._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/superadmin/products/${res._id}`}>
                        <span className="btn btn-warning text-capitalize">
                          Update
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/superadmin/profile/${res._id}`}>
                        <span className="btn btn-warning text-capitalize">
                          Update
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/superadmin/carousel/${res._id}`}>
                        <span className="btn btn-warning text-capitalize">
                          Update
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/menu/${res._id}`}>
                        <span className="btn btn-info text-capitalize">
                          View
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/restaurants`}>
                        <span className="btn btn-danger text-capitalize">
                          Delete
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}
