import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { getUsers } from "../apicalls/restaurantapicalls";
import { Col, Container, Row, Spinner } from "react-bootstrap";

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
      <div>
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
            <div className="container-fluid px-3">
              <Row>
                {products.map((user, index) => (
                  <Col key={index} sm={12} md={6} lg={4} xl={4}>
                    <Cards user={user} />
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </div>
    </>
  );
}
