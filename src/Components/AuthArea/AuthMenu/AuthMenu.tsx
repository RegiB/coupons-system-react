import { Button } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AdminMenu from "../../AdminArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../CompanyArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../CustomerArea/CustomerMenu/CustomerMenu";
import "./AuthMenu.css";

interface AuthMenuState {
  user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {
  private unsubscribeMe: Unsubscribe;

  public constructor(props: {}) {
    super(props);
    this.state = { user: store.getState().authState.user };
  }

  public componentDidMount() {
    this.unsubscribeMe = store.subscribe(() => {
      this.setState({ user: store.getState().authState.user });
    });
  }

  public render(): JSX.Element {
    return (
      <div className="AuthMenu">
        {this.state.user && this.state.user.clientType === "ADMINISTRATOR" && (
          <AdminMenu />
        )}
        {this.state.user && this.state.user.clientType === "COMPANY" && (
          <CompanyMenu />
        )}
        {this.state.user && this.state.user.clientType === "CUSTOMER" && (
          <CustomerMenu />
        )}
        {!this.state.user && (
          <>
            <NavLink to="/login">
              <Button size="large" color="primary" >
                Log In
              </Button>
            </NavLink>
          </>
        )}
      </div>
    );
  }

  public componentWillUnmount() {
    this.unsubscribeMe();
  }
}

export default AuthMenu;
