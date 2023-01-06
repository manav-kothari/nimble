import React, { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import { getProducts } from "../../apicalls/restaurantapicalls";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useParams } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

const AvailableMeals = ({ match }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState();

  const { userId } = useParams();

  const loadAllProduct = (userId) => {
    getProducts(userId).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log("fucked");
      } else {
        setMeals(data.products);
        setIsLoading(false);
        console.log(data.products);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    loadAllProduct(userId);
  }, [userId]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal._id}
      key={meal._id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  console.log(meals);

  if (isLoading) {
    return (
      <>
        <section className="text-center p-4 bg-white shadow-md rounded-2xl max-w-[60rem] w-[90%] my-8 mx-auto">
          <IconContext.Provider value={{ className: "spinner" }}>
            <ImSpinner9 />
          </IconContext.Provider>
        </section>
      </>
    );
  }

  if (Error) {
    return (
      <section className="p-4 bg-white shadow-md rounded-2xl max-w-[60rem] w-[90%] my-8 mx-auto text-center">
        <p className="text-2xl text-red-600">{Error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="max-w-[60rem] w-[90%] my-8 mx-auto animate-meals-appear">
        <Card>
          <ul className="list-none m-0 p-0">{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
