import { Typography } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import CouponCard from "../../GeneralArea/CouponCard/CouponCard";
import "./TopPicks.css";

interface TopPicksState {
  coupons: CouponModel[];
}

class TopPicks extends Component<{}, TopPicksState> {
  public constructor(props: {}) {
    super(props);
    this.state = { coupons: [] };
  }

  public async componentDidMount() {
    try {
      const response = await axios.get<CouponModel[]>(globals.urls.getTopPicks);
      this.setState({ coupons: response.data });
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="TopPicks">
        <br />
        <Typography className="TitleTop" variant="h4">
          Top Picks
        </Typography>
        <div className="HomeCards">
          {this.state.coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              couponLink={"/home/top-picks/"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TopPicks;
