import React from "react";

const CartItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;

  return (
    <li className="flex justify-between items-center cart-item-border py-4 px-0 my-4 mx-0">
      <div>
        <span className="mt-0 mr-0 mb-2 ml-0 h4">{props.name}</span>
        <div className="w-[10rem] flex justify-between items-center">
          <span className="font-bold ">{price}</span>
          <span className="font-bold custom-border py-1 px-3 rounded-md ">{`x${props.amount}`}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <button className="cart-item-btn" onClick={props.onRemove}>
          -
        </button>
        <button className="cart-item-btn" onClick={props.onAdd}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
