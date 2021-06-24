import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CompanyModel from "../../../Models/CompanyModel";
import { companyAddedAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCompany.css";

interface State {
  name: string;
  email: string;
  password: string;
}

function AddCompany(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CompanyModel>();
  const [values, setValues] = useState<State>({
    name: "",
    email: "",
    password: "",
  });

  async function send(company: CompanyModel) {
    try {
      const response = await jwtAxios.post<CompanyModel>(
        globals.urls.addCompany,
        company
      );
      const addedCompany = response.data;
      store.dispatch(companyAddedAction(addedCompany));
      notify.success("Company added!");
      history.push("/admin/companies");
    } catch (error) {
      notify.error(error);
    }
  }

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <div className="AddCompany">
      <Typography variant="h4" className="TitleMain">
        Add Company:
      </Typography>
      <br />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          required
          className="FieldText"
          name="name"
          label="Name:"
          type="text"
          variant="outlined"
          inputRef={register({ minLength: 3 })}
          onChange={handleChange("name")}
          error={values.name !== "" && values.name.length < 3}
          helperText={
            values.name && values.name.length < 3
              ? "Name must be at least 3 characters long"
              : ""
          }
        />
        <br />
        <br />
        <TextField
          required
          className="FieldText"
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
          className="FieldText"
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

export default AddCompany;
