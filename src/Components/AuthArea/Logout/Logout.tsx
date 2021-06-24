import { useEffect } from "react";
import { useHistory } from "react-router";
import { logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";

function Logout(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    store.dispatch(logoutAction());
    notify.success("You have been logged out!");
    history.push("/home");
  });

  return <></>;
}

export default Logout;
