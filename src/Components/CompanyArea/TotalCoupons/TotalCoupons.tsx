import { Typography } from "@material-ui/core";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import "./TotalCoupons.css";

interface TotalCouponsState {
  totalCoupons: number;
}

class TotalCoupons extends Component<{}, TotalCouponsState> {
  public constructor(props: {}) {
    super(props);
    this.state = { totalCoupons: 0 };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCompCoupons
      );
      this.setState({ totalCoupons: response.data.length });
    } catch (error) {}
  }

  public render(): JSX.Element {
    return (
      <div className="TotalCoupons">
        <Typography className="Title" variant="h4">
          <b>Total Coupons:</b>&nbsp;{this.state.totalCoupons}
        </Typography>
      </div>
    );
  }
}

export default TotalCoupons;
