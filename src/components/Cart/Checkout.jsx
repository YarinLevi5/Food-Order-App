import classes from "./Checkout.module.css";
import { useReducer } from "react";

const Checkout = (props) => {
  const actionsEnum = {
    INPUT: "input",
    BLUR: "blur",
    SUBMIT: "submit",
  };
  const formData = [
    {
      title: "Your Name",
      label: "name",
      inputType: "text",
      errorMsg: "Please fill your name field",
    },
    {
      title: "City",
      label: "city",
      inputType: "text",
      errorMsg: "Please fill your city field",
    },
    {
      title: "Street Name",
      label: "street",
      inputType: "text",
      errorMsg: "Please fill your street field",
    },
    {
      title: "Home Number",
      label: "homeNumber",
      inputType: "number",
      errorMsg: "Please fill your home number field",
    },
    {
      title: "Postal Code",
      label: "postal",
      inputType: "text",
      errorMsg: "Please fill your postal code field",
    },
  ];

  const initialState = {
    name: "",
    city: "",
    street: "",
    homeNumber: 0,
    postal: "",
    errors: {},
  };

  const validateForm = (stateValues) => {
    let errors = {};
    formData.forEach((field) => {
      if (
        (typeof stateValues[field.label] === "string" &&
          (stateValues[field.label].trim() === "" ||
            stateValues[field.label].trim().length <= 1)) ||
        (typeof stateValues[field.label] === "number" &&
          !stateValues[field.label])
      ) {
        errors[field.label] = field.errorMsg;
      } else {
        errors[field.label] = "";
      }
    });
    return errors;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case (actionsEnum.INPUT, actionsEnum.BLUR):
        return {
          ...state,
          [action.field]:
            action.field === "homeNumber"
              ? parseInt(action.value)
              : action.value,
          errors: {
            ...state.errors,
            [action.field]: "",
          },
        };
      case actionsEnum.SUBMIT:
        const errors = validateForm(state);
        if (
          Object.values(errors).filter((value) => value !== "").length !== 0
        ) {
          return {
            ...state,
            errors,
          };
        }
        props.onConfirm({ ...state });
        return initialState;
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const confirmHandler = (event) => {
    event.preventDefault();
    dispatch({ type: actionsEnum.SUBMIT });
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    if (e.type === "blur") {
      dispatch({
        type: actionsEnum.BLUR,
        field: name,
        value,
      });
    } else {
      dispatch({ type: actionsEnum.INPUT, field: name, value });
    }
  };

  return (
    <form className={classes.form}>
      {formData.map((data, index) => {
        return (
          <div className={classes.control} key={index}>
            <label htmlFor={data.label}>{data.title}</label>
            <input
              name={data.label}
              onChange={changeHandler}
              onBlur={changeHandler}
              placeholder={data.title}
              min={1}
              type={data.inputType}
              id={data.label}
              ref={data.ref}
              value={state.value}
            />
            {state.errors[data.label] && (
              <p className={classes.invalid}>{data.errorMsg}</p>
            )}
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
