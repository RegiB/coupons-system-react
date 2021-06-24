import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CustomerModel from "../../../Models/CustomerModel";
import { customerAddedAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCustomer.css";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function AddCustomer(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CustomerModel>();
  const [values, setValues] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function send(customer: CustomerModel) {
    try {
      const response = await jwtAxios.post<CustomerModel>(
        globals.urls.addCustomer,
        customer
      );
      const addedCustomer = response.data;
      store.dispatch(customerAddedAction(addedCustomer));
      notify.success("Customer added!");
      history.push("/admin/customers");
    } catch (error) {
      notify.error(error);
    }
  }

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div className="AddCustomer">
      <Typography variant="h4" className="TitleMain">
        Add Customer:
      </Typography>
      <br />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          required
          className="FieldText"
          name="firstName"
          label="FirstName:"
          type="text"
          variant="outlined"
          inputRef={register({ minLength: 3 })}
          onChange={handleChange("firstName")}
          error={values.firstName !== "" && values.firstName.length < 3}
          helperText={
            values.firstName && values.firstName.length < 3
              ? "First name must be at least 3 characters long"
              : ""
          }
        />
        <TextField
          required
          className="FieldText"
          name="lastName"
          label="LastName:"
          type="text"
          variant="outlined"
          inputRef={register({ minLength: 3 })}
          onChange={handleChange("lastName")}
          error={values.lastName !== "" && values.lastName.length < 3}
          helperText={
            values.lastName && values.lastName.length < 3
              ? "Last name must be at least 3 characters long"
              : ""
          }
        />
        <br />
        <br />
        <TextField
          required
          className="FieldText2"
          name="email"
          label="Email:"
          type="email"
          variant="outlined"
          inputRef={register({
            pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/,
          })}
          onChange={handleChange("email")}
          error={
            values.email !== "" &&
            !values.email.match(
              "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
            )
          }
          helperText={
            values.email !== "" &&
            !values.email.match(
              "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
            )
              ? "Enter a valid email"
              : ""
          }
        />
        <br />
        <br />
        <TextField
          required
          className="FieldText2"
          type="text"
          name="password"
          label="Password:"
          inputRef={register({
            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          })}
          variant="outlined"
          onChange={handleChange("password")}
          error={
            values.password !== "" &&
            !values.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
          }
          helperText={
            values.password &&
            !values.password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
              ? "Enter a valid password"
              : ""
          }
        />
        <br />
        <br />
        <Button variant="contained" type="submit" className="AddUpdateBtn">
          add
        </Button>
      </form>
    </div>
  );
}

export default AddCustomer;
