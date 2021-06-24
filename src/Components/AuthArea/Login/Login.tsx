import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import UserModel from "../../../Models/UserModel";
import CredentialsModel from "../../../Models/CredentialsModel";
import { loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import "./Login.css";
import notify from "../../../Services/Notification";
import { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface State {
  email: string;
  password: string;
  client: string;
  showPassword: boolean;
}

function Login(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    client: "ADMINISTRATOR",
    showPassword: false,
  });
  const isEnabled = values.email !== "" && values.password !== "";

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function send(credentials: CredentialsModel) {
    const headers = {
      email: credentials.email,
      password: credentials.password,
      clientType: values.client,
    };

    try {
      const response = await axios.post<UserModel>(globals.urls.login, null, {
        headers,
      });
      store.dispatch(loginAction(response.data));
      notify.success("You are Logged in!");
      history.push("/home");
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="Login Box">
      <div>
        <LockOutlinedIcon />
      </div>
      <Typography variant="h4" className="HeadMain">
        Log In
      </Typography>
      <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          required
          className="FieldText"
          type="email"
          name="email"
          label="Email:"
          variant="outlined"
          onChange={handleChange("email")}
          inputRef={register}
        />
        <br />
        <br />
        <FormControl variant="outlined" className="FieldText">
          <InputLabel htmlFor="outlined-adornment-password">
            Password: *
          </InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            name="password"
            inputRef={register}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={90}
          />
        </FormControl>
        <br />
        <br />
        <FormControl component="fieldset">
          <RadioGroup
            className="RadioType"
            aria-label="clientType"
            name="clientType"
            value={values.client}
            onChange={handleChange("client")}
          >
            <FormControlLabel
              value="ADMINISTRATOR"
              control={<Radio />}
              label="Administrator"
            />
            <FormControlLabel
              value="COMPANY"
              control={<Radio />}
              label="Company"
            />
            <FormControlLabel
              value="CUSTOMER"
              control={<Radio />}
              label="Customer"
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className="LoginBtn"
          disabled={!isEnabled}
        >
          log in
        </Button>
      </form>
    </div>
  );
}

export default Login;
