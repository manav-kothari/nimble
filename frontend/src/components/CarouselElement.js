import React, { useState, useEffect } from "react";
import { Carousel, Container, Image, Spinner } from "react-bootstrap";
import { API } from "../backend";
import { getCarousel } from "./helper/coreapicalls";

const CarouselElement = () => {
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const preload = () => {
    getCarousel().then((data) => {
      if (data.error) {
        setError(data.error);
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
          <Carousel className="carousel mb-2" pause="hover">
            {carousel.map((caro) => (
              <Carousel.Item key={caro._id}>
                <Image
                  src={`${API}/carousel/photo/${caro._id}`}
                  className="img-responsive center-block"
                  fluid
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default CarouselElement;
