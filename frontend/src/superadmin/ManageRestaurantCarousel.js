import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button, Row, Col, Pagination } from "react-bootstrap";
import {
  getCarousel,
  deleteCarousel,
  isAuthenticated,
} from "../apicalls/restaurantapicalls";
import Menu from "../components/Menu";

const ManageRestaurantCarousel = () => {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  const preload = () => {
    getCarousel(userId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCarousel(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCarousel = (carouselId) => {
    deleteCarousel(carouselId, user._id, token).then((data) => {
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
          Failed! to load carousel
        </h4>
      );
    }
  };

  return (
    <>
      <Menu />
      {loading ? (
        loadingMessage()
      ) : error ? (
        errorMessage()
      ) : (
        <>
          <div className="p-3 page3">
            <Link
              to="/superadmin/restaurants"
              className="btn btn-md btn-primary mb-3"
            >
              Go Back
            </Link>
            <Link
              to={`/superadmin/create/carousel/${userId}`}
              className="btn btn-md btn-info mb-3 float float-right"
            >
              Add Carousel
            </Link>
            <div className="page">
              <div className="container">
                <h3 className="text-dark text-center p-2">
                  All Carousels Images:
                </h3>
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
                    <th>DELETE</th>
                  </tr>
                </thead>

                <tbody className="text-center text-dark">
                  {carousel.map((caro) => (
                    <tr key={caro._id}>
                      <td>{caro.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure?")) {
                              deleteThisCarousel(caro._id);
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
      )}
    </>
  );
};

export default ManageRestaurantCarousel;
