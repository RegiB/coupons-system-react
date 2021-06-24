import { Avatar, Typography } from "@material-ui/core";
import { Component } from "react";
import CustomerModel from "../../../Models/CustomerModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import PurchasedCoupons from "../PurchasedCoupons/PurchasedCoupons";
import "./CustomerDetails.css";

interface CustomerDetailsState {
  customer: CustomerModel;
}

class CustomerDetails extends Component<{}, CustomerDetailsState> {
  public constructor(props: {}) {
    super(props);
    this.state = { customer: JSON.parse(localStorage.getItem("user")) };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CustomerModel>(
        globals.urls.getCustomerDetails
      );
      this.setState({ customer: response.data });
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="CustomerDetails Box">
        <div className="Details">
          <Typography className="Title" variant="h4">
            <Avatar src="/broken-image.jpg" />
            &nbsp;Hello {this.state.customer.firstName}&nbsp;
            {this.state.customer.lastName}!
          </Typography>
          <br />
          <Typography className="Par" variant="h4">
            <b>Email:</b>
            &nbsp;{this.state.customer.email}
          </Typography>
          <Typography className="Par" variant="h4">
            <b>Password:</b>
            &nbsp;{this.state.customer.password}
          </Typography>
        </div>
        <div>
          <Typography className="Par" variant="h4">
            You have:
          </Typography>
        </div>
        <div className="InfoBox">
          <PurchasedCoupons />
        </div>
      </div>
    );
  }
}

export default CustomerDetails;
