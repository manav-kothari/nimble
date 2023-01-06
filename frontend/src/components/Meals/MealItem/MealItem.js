import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;

  const handleAddToCart = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className="flex justify-between m-4 pb-4 border-bottom">
      <div>
        <h3 className="mt-0 mx-0 mb-1">{props.name}</h3>
        <div className="italic">{props.description}</div>
      </div>
      <div>
        <div className=" font-bold text-black-550 float-right">{price}</div>
        <MealItemForm id={props.id} onAddToCart={handleAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
