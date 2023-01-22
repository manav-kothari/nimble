import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AvailableMeals from "./AvailableMeals";
import AvailableMealsCate from "./AvailableMealsCate";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  // const [categoryId, setCategoryId] = useState(0);

  // const { categoryId } = useParams();
  // console.log(categoryId);

  return (
    <>
      <MealsSummary />
      {/* {categoryId === undefined ? <AvailableMeals /> : <AvailableMealsCate />} */}
      <AvailableMeals />
    </>
  );
};

export default Meals;
