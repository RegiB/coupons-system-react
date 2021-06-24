import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customerUpdatedAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCustomer.css";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RouteParams {
  id: string;
}

interface UpdateCustomerProps extends RouteComponentProps<RouteParams> {}

function UpdateCustomer(props: UpdateCustomerProps): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CustomerModel>();
  const [state] = useState({
    customer: store
      .getState()
      .customersState.customers.find(
        (customer) => customer.id === +props.match.params.id
      ),
  });
  const [values, setValues] = useState<State>({
    firstName: state.customer.firstName,
    lastName: state.customer.lastName,
    email: state.customer.email,
    password: state.customer.password,
  });

  async function send(customer: CustomerModel) {
    try {
      customer.id = +props.match.params.id;
      if (
        customer.firstName !== state.customer.firstName ||
        customer.lastName !== state.customer.lastName ||
        customer.email !== state.customer.email ||
        customer.password !== state.customer.password
      ) {
        const response = await jwtAxios.put<CustomerModel>(
          globals.urls.updateCustomer,
          customer
        );
        const updatedCustomer = response.data;
        store.dispatch(customerUpdatedAction(updatedCustomer));
        notify.success("Customer updated!");
        history.push("/admin/customers");
      }
    } catch (error) {
      notify.error(error);
    }
  }

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div className="UpdateCustomer">
      <Typography variant="h4" className="TitleMain">
        Update Customer:
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
          defaultValue={state.customer.firstName}
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
          defaultValue={state.customer.lastName}
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
          defaultValue={state.customer.email}
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
          defaultValue={state.customer.password}
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
          update
        </Button>
        <br />
        <br />
        <NavLink className="CancelLink" to={"/admin/customers"}>
          cancel
        </NavLink>
      </form>
    </div>
  );
}

export default UpdateCustomer;
