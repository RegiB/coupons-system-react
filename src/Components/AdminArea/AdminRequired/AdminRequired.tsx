import { Component } from "react";
import { useHistory } from "react-router";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notification";

function AdminRequired(ComposedComponent: any) {
  const history = useHistory();

  class Authenticated extends Component<{}, {}> {
    public constructor(props: {}) {
      super(props);
    }

    public componentWillMount() {
      if (
        (store.getState().authState.user &&
          store.getState().authState.user.clientType !== "ADMINISTRATOR") ||
        !store.getState().authState.user
      ) {
        notify.error("You are not authorized!");
        history.push("/login");
      }
    }

    render() {
      return <ComposedComponent />;
    }
  }
  //Return the new Component that requires authorization
  return Authenticated;
}
export default AdminRequired;