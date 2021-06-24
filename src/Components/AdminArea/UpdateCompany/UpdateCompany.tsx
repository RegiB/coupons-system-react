import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyUpdatedAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCompany.css";

interface State {
  email: string;
  password: string;
}

interface RouteParams {
  id: string;
}

interface UpdateCompanyProps extends RouteComponentProps<RouteParams> {}

function UpdateCompany(props: UpdateCompanyProps): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CompanyModel>();
  const [state] = useState({
    company: store
      .getState()
      .companyState.companies.find(
        (company) => company.id === +props.match.params.id
      ),
  });
  const [values, setValues] = useState<State>({
    email: state.company.email,
    password: state.company.password,
  });

  async function send(company: CompanyModel) {
    try {
      company.id = +props.match.params.id;
      if (
        company.email !== state.company.email ||
        company.password !== state.company.password
      ) {
        const response = await jwtAxios.put<CompanyModel>(
          globals.urls.updateCompany,
          company
        );
        const updatedCompany = response.data;
        store.dispatch(companyUpdatedAction(updatedCompany));
        notify.success("Company updated!");
        history.push("/admin/companies");
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
    <div className="UpdateCompany">
      <Typography variant="h4" className="TitleMain">
        Update Company:
      </Typography>
      <br />
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          className="FieldText"
          name="name"
          label="Name:"
          type="text"
          defaultValue={state.company.name}
          variant="outlined"
          inputRef={register}
          disabled
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
          defaultValue={state.company.email}
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
          defaultValue={state.company.password}
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
        <NavLink className="CancelLink" to={"/admin/companies"}>
          cancel
        </NavLink>
      </form>
    </div>
  );
}

export default UpdateCompany;
