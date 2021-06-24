import { Button, MenuItem, TextField } from "@material-ui/core";
import { Component, SyntheticEvent } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponDownloadedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CustomerCouponCard from "../CustomerCouponCard/CustomerCouponCard";
import "./CustomerCoupons.css";

interface CustomerCouponsState {
  categoryToFindBy: string;
  priceToFindBy: string;
  coupons: CouponModel[];
}

const categories = [
  { value: 1, label: "ACCESSORIES" },
  { value: 2, label: "BABY" },
  { value: 3, label: "BEAUTY" },
  { value: 4, label: "CINEMA" },
  { value: 5, label: "CLOTHING" },
  { value: 6, label: "FLOWERS" },
  { value: 7, label: "FOOD" },
  { value: 8, label: "GIFTS" },
  { value: 9, label: "HOLIDAYS" },
  { value: 10, label: "PETS" },
  { value: 11, label: "SPORTS" },
  { value: 12, label: "TRAVEL" },
];

class CustomerCoupons extends Component<{}, CustomerCouponsState> {
  public constructor(props: {}) {
    super(props);
    this.state = { categoryToFindBy: "", priceToFindBy: "", coupons: [] };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCustCoupons
      );
      this.setState({ coupons: response.data });
      store.dispatch(couponDownloadedAction(response.data));
    } catch (error) {
      notify.error(error);
    }
  }

  private setValueCategory = (args: SyntheticEvent) => {
    const categoryToFindBy = (args.target as HTMLInputElement).value;
    this.setState({ categoryToFindBy });
  };

  private setValuePrice = (args: SyntheticEvent) => {
    const priceToFindBy = (args.target as HTMLInputElement).value;
    this.setState({ priceToFindBy });
  };

  public async findCouponsByCategory(category: string) {
    try {
      if (category !== "") {
        const response = await jwtAxios.get<CouponModel[]>(
          globals.urls.getCustCouponsByCategory + category
        );
        this.setState({ coupons: response.data });
      }
    } catch (error) {
      notify.error(error);
    }
  }

  public async findCouponsByMaxPrice(price: string) {
    try {
      if (price !== "") {
        const response = await jwtAxios.get<CouponModel[]>(
          globals.urls.getCustCouponsByPrice + +price
        );
        this.setState({ coupons: response.data });
      }
    } catch (error) {
      notify.error(error);
    }
  }

  private clearValue = () => {
    this.setState({
      categoryToFindBy: "",
      priceToFindBy: "",
      coupons: store.getState().couponsState.coupons,
    });
  };

  public render(): JSX.Element {
    return (
      <div className="CustomerCoupons">
        <div className="InputPrice">
          <TextField
            type="number"
            label="Price: ($)"
            variant="standard"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={this.setValuePrice}
            value={this.state.priceToFindBy}
            helperText="Please enter maximum price"
          />
          &nbsp;
          <Button
            className="BtnFind"
            onClick={() => this.findCouponsByMaxPrice(this.state.priceToFindBy)}
          >
            Show Results
          </Button>
        </div>
        <div className="InputCategory">
          <TextField
            select
            label="Category:"
            value={this.state.categoryToFindBy}
            onChange={this.setValueCategory}
            variant="standard"
            helperText="Please choose category"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          &nbsp;
          <Button
            className="BtnFind"
            onClick={() =>
              this.findCouponsByCategory(this.state.categoryToFindBy)
            }
          >
            Show Results
          </Button>
          <Button className="BtnClear" onClick={this.clearValue}>
            Clear Filters
          </Button>
        </div>
        <br />
        <br />
        <div className="CouponsList">
          {this.state.coupons.map((coupon) => (
            <CustomerCouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    );
  }
}

export default CustomerCoupons;
