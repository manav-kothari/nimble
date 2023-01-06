import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import { getAUser } from "../../apicalls/restaurantapicalls";
import { useParams } from "react-router-dom";

export default function MealsSummary() {
  const [products, setProducts] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const loadAllProduct = () => {
    getAUser(userId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        console.log(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    loadAllProduct();
  }, []);

  return (
    <section className="text-center max-w-[45rem] w-[90%] m-auto mt-[-10rem] relative   rounded-2xl p-4 shadow-0.5xl">
      <span
        style={{ fontFamily: "sans-serif" }}
        className="mt-0 text-capitalize text-2xl md:text-[2rem]"
      >
        {products.name}
      </span>
      {/* <p className="text-dark">tagline</p> */}
    </section>
  );
}
