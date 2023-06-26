import classes from "./Checkout.module.css";
import { useRef } from "react";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const homeNumberInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredHomeNumber = homeNumberInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    console.log(
      enteredCity,
      enteredHomeNumber,
      enteredPostal,
      enteredName,
      enteredStreet
    );
  };

  const formData = [
    {
      title: "Your Name",
      label: "name",
      inputType: "text",
      ref: nameInputRef,
    },
    {
      title: "City",
      label: "city",
      inputType: "text",
      ref: cityInputRef,
    },
    {
      title: "Street Name",
      label: "street-name",
      inputType: "text",
      ref: streetInputRef,
    },
    {
      title: "Home Number",
      label: "home-number",
      inputType: "number",
      ref: homeNumberInputRef,
    },
    {
      title: "Postal Code",
      label: "postal-code",
      inputType: "text",
      ref: postalInputRef,
    },
  ];

  return (
    <form className={classes.form}>
      {formData.map((data, index) => {
        return (
          <div className={classes.control} key={index}>
            <label htmlFor={data.label}>{data.title}</label>
            <input type={data.inputType} id={data.label} ref={data.ref} />
          </div>
        );
      })}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
