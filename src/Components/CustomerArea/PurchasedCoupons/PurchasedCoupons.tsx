import { Typography } from "@material-ui/core";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./PurchasedCoupons.css";

interface PurchasedCouponsState {
  numCoupons: number;
}

class PurchasedCoupons extends Component<{}, PurchasedCouponsState> {
  public constructor(props: {}) {
    super(props);
    this.state = { numCoupons: 0 };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCustCoupons
      );

      this.setState({ numCoupons: response.data.length });
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="PurchasedCoupons">
        <Typography className="TitleNum">
          <b>Coupons Purchases:</b>&nbsp;{this.state.numCoupons}
        </Typography>
      </div>
    );
  }
}

export default PurchasedCoupons;
