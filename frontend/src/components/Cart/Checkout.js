import React, { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    number: true,
    tableNumber: true,
    description: true,
  });

  const nameInputRef = useRef();
  const numberInputRef = useRef();
  const tableNumberInputRef = useRef();
  const descriptionInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredNumber = numberInputRef.current.value;
    const enteredTableNumber = tableNumberInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredNumberIsValid = !isEmpty(enteredNumber);
    const enteredTableNumberIsValid = !isEmpty(enteredTableNumber);
    const enteredDescriptionIsValid = !isEmpty(enteredDescription);

    setFormInputsValidity({
      name: enteredNameIsValid,
      number: enteredNumberIsValid,
      tableNumber: enteredTableNumberIsValid,
      description: enteredDescriptionIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredNumberIsValid &&
      enteredDescriptionIsValid &&
      enteredTableNumberIsValid;

    if (!formIsValid) return;

    props.onSubmit({
      name: enteredName,
      number: enteredNumber,
      tableNumber: enteredTableNumber,
      description: enteredDescription,
    });
  };
  return (
    <form className="my-4 mx-0 h-[19rem] overflow-auto" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label
          className={`font-bold mb-1 block ${
            formInputsValidity.name ? "" : "text-red-450"
          }`}
          htmlFor="name"
        >
          Your Name
        </label>
        <input
          className={`font-inherit custom-border rounded w-80 max-w-full ${
            formInputsValidity.name ? "" : "border-red-550 bg-red-75"
          }`}
          type="text"
          id="name"
          ref={nameInputRef}
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className="mb-2">
        <label
          className={`font-bold mb-1 block ${
            formInputsValidity.number ? "" : "text-red-450"
          }`}
          htmlFor="number"
        >
          Mobile Number
        </label>
        <input
          className={`font-inherit custom-border rounded w-80 max-w-full ${
            formInputsValidity.number ? "" : "border-red-550 bg-red-75"
          }`}
          type="numeric"
          id="number"
          ref={numberInputRef}
        />
        {!formInputsValidity.number && <p>Please enter a valid number!</p>}
      </div>
      <div className="mb-2">
        <label
          className={`font-bold mb-1 block ${
            formInputsValidity.tableNumber ? "" : "text-red-450"
          }`}
          htmlFor="table"
        >
          Table Number
        </label>
        <input
          className={`font-inherit custom-border rounded w-80 max-w-full ${
            formInputsValidity.tableNumber ? "" : "border-red-550 bg-red-75"
          }`}
          type="nummeric"
          id="table"
          ref={tableNumberInputRef}
        />
        {!formInputsValidity.tableNumber && (
          <p>Please enter a valid table Number</p>
        )}
      </div>
      <div className="mb-2">
        <label
          className={`font-bold mb-1 block ${
            formInputsValidity.description ? "" : "text-red-450"
          }`}
          htmlFor="description"
        >
          Instructions
        </label>
        <input
          className={`font-inherit custom-border rounded w-80 max-w-full ${
            formInputsValidity.description ? "" : "border-red-550 bg-red-75"
          }`}
          type="text"
          id="description"
          ref={descriptionInputRef}
        />
        {!formInputsValidity.description && (
          <p>Please enter a valid description!</p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button className="checkout-btn" type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="checkout-btn bg-yellow-980 text-white border border-solid border-yellow-980 hover:bg-yellow-880 active:bg-yellow-880">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
