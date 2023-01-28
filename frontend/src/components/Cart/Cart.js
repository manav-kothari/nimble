import React, { useContext, useState } from "react";
import { API } from "../../backend";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);
  const { userId } = useParams();

  const totalAmount = `₹${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const handleCartItemAdd = (item) => {
    cartContext.addItem(item);
  };
  const handleCartItemRemove = (id) => {
    cartContext.removeItem(id);
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  // const orderData = {
  //       products: products,
  //       transaction_id: data.id,
  //       amount: data.amount,
  //       instruction: instruction,
  //       branch: branch,
  //       number: number,
  //     };

  const handleSubmitOrder = async (info) => {
    setIsSubmitting(true);
    await fetch(`${API}/order/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderedItems: cartContext.items,
        amount: cartContext.totalAmount,
        name: info.name,
        mobileNumber: info.number,
        tableNumber: info.tableNumber,
        instruction: info.description,
        userId: userId,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = cartContext.items.map((cartItem) => (
    <ul className="list-none m-0 p-0 max-h-80 ">
      <CartItem
        key={cartItem.id}
        id={cartItem.id}
        name={cartItem.name}
        amount={cartItem.amount}
        price={cartItem.price}
        onAdd={handleCartItemAdd.bind(null, cartItem)}
        onRemove={handleCartItemRemove.bind(null, cartItem.id)}
      />
    </ul>
  ));

  const modalActions = (
    <div className="text-right">
      <button
        style={{ backgroundColor: "#577bbc" }}
        className="cart-btn text-white"
        onClick={props.onHideCart}
      >
        Close
      </button>
      {hasItems && (
        <button
          style={{ backgroundColor: "#0f172a" }}
          className="cart-btn  text-white"
          onClick={handleOrder}
        >
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <div style={{ height: "80vh", overflow: "auto" }}>
      {cartItems}
      <div className="flex items-center justify-between font-bold text-2xl my-4 mx-0">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onHideCart}
          onSubmit={(info) => {
            handleSubmitOrder(info);
          }}
        />
      )}
      {!isCheckout && modalActions}
    </div>
  );

  const isSubmittingModalContent = (
    <p className="text-2xl">Sending order data...</p>
  );

  const didSubmitModalContent = (
    <>
      <p className="text-2xl">Successfully sent order!</p>
      <div className="text-right">
        <button
          style={{ backgroundColor: "#0f172a" }}
          className="cart-btn text-white"
          onClick={props.onHideCart}
        >
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
