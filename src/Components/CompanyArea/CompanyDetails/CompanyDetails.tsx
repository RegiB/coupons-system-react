import { Avatar, Typography } from "@material-ui/core";
import { Component } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CouponsPurchased from "../CompanyCouponsPurchased/CouponsPurchased";
import TotalCoupons from "../TotalCoupons/TotalCoupons";
import "./CompanyDetails.css";

interface CompanyDetailsState {
  company: CompanyModel;
}

class CompanyDetails extends Component<{}, CompanyDetailsState> {
  public constructor(props: {}) {
    super(props);
    this.state = { company: JSON.parse(localStorage.getItem("user")) };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CompanyModel>(
        globals.urls.getCompanyDetails
      );
      this.setState({ company: response.data });
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="CompanyDetails Box">
        <div className="Details">
          <Typography className="Title" variant="h4">
            <Avatar className="Avatar">C</Avatar>
            &nbsp;Hello {this.state.company.name}!
          </Typography>
          <br />
          <Typography className="Par" variant="h4">
            <b>Email:</b>
            &nbsp;{this.state.company.email}
          </Typography>
          <Typography className="Par" variant="h4">
            <b>Password:</b>
            &nbsp;{this.state.company.password}
          </Typography>
        </div>
        <div>
          <Typography className="Par" variant="h4">
            You have:
          </Typography>
          <div className="InfoBox">
            <TotalCoupons />
          </div>
          <div className="InfoBox">
            <CouponsPurchased />
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyDetails;
