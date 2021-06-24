import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import CouponModel from "../../../Models/CouponModel";
import { couponDownloadedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import CouponCard from "../CouponCard/CouponCard";
import "./CouponsList.css";

interface RouteParams {
  category: string;
}

interface CouponsListProps extends RouteComponentProps<RouteParams> {}

interface CouponsListState {
  coupons: CouponModel[];
  currentCategory: string;
}

class CouponsList extends Component<CouponsListProps, CouponsListState> {
  public constructor(props: CouponsListProps) {
    super(props);
    this.state = {
      coupons: [],
      currentCategory: "",
    };
  }

  public async componentDidMount() {
    try {
      const response = await axios.get<CouponModel[]>(
        globals.urls.getCouponsByCategory + this.props.match.params.category
      );
      this.setState({
        coupons: response.data,
        currentCategory: this.props.match.params.category,
      });
      store.dispatch(couponDownloadedAction(response.data));
    } catch (error) {
      notify.error(error);
    }
  }

// when a category is changed in url path- for search bar
  public async componentDidUpdate() {
    try {
      if (this.state.currentCategory !== this.props.match.params.category) {
        const response = await axios.get<CouponModel[]>(
          globals.urls.getCouponsByCategory + this.props.match.params.category
        );
        this.setState({
          coupons: response.data,
          currentCategory: this.props.match.params.category,
        });
        store.dispatch(couponDownloadedAction(response.data));
      }
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="CouponsList">
        <Typography className="TitleTop" variant="h4">
          {this.props.match.params.category}
        </Typography>
        <div className="CategoryCards">
          {this.state.coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              couponLink={
                "/categories/" +
                this.props.match.params.category +
                "/coupon-details/"
              }
            />
          ))}
        </div>
        <br />
        <NavLink to="/categories" className="LinkForward">
          <Button>Back</Button>
        </NavLink>
      </div>
    );
  }
}

export default CouponsList;
