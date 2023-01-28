import React, { useRef, useState } from "react";
import Input from "./../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="float-right" onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label=""
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "20",
          step: "1",
          defaultValue: "1",
          className: "w-12 font-inherit pl-2 rounded-md custom-border",
        }}
      />
      <button
        style={{ backgroundColor: "#577bbc" }}
        className="font-inherit cursor-pointer  custom-border   py-1 px-8 rounded-3xl font-bold  transition-colors"
      >
        Add
      </button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
