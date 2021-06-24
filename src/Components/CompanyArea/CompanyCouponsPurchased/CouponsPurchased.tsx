import { Component } from "react";
import "./CouponsPurchased.css";
import { Typography } from "@material-ui/core";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";

interface CouponsPurchasedState {
  purchasedCoupons: number;
}

class CouponsPurchased extends Component<{}, CouponsPurchasedState> {
  public constructor(props: {}) {
    super(props);
    this.state = { purchasedCoupons: 0 };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get(
        globals.urls.getCompCouponsPurchased
      );

      this.setState({ purchasedCoupons: response.data });
    } catch (error) {}
  }

  public render(): JSX.Element {
    return (
      <div className="CouponsPurchased">
        <Typography className="Title" variant="h4">
          <b>Coupons Purchases:</b>&nbsp;{this.state.purchasedCoupons}
        </Typography>
      </div>
    );
  }
}

export default CouponsPurchased;
