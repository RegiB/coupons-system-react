import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { Component, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponDownloadedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import EditIcon from "@material-ui/icons/Edit";
import "./CompanyCouponsTable.css";
import CouponDeleteConfirm from "../CouponDeleteConfirm/CouponDeleteConfirm";
import { Unsubscribe } from "redux";

interface CompanyCouponsTableState {
  coupons: CouponModel[];
  categoryToFindBy: string;
  priceToFindBy: string;
  rowsPerPage: number;
  page: number;
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

class CompanyCouponsTable extends Component<{}, CompanyCouponsTableState> {
  private unsubscribeMe: Unsubscribe;

  public constructor(props: {}) {
    super(props);
    this.state = {
      categoryToFindBy: "",
      priceToFindBy: "",
      coupons: [],
      rowsPerPage: 10,
      page: 0,
    };
  }

  public async componentDidMount() {
    try {
      const response = await jwtAxios.get<CouponModel[]>(
        globals.urls.getCompCoupons
      );
      this.setState({ coupons: response.data });
      store.dispatch(couponDownloadedAction(response.data));
      this.unsubscribeMe = store.subscribe(() => {
        this.setState({ coupons: store.getState().couponsState.coupons });
      });
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
          globals.urls.getCompCouponsByCategory + category
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
          globals.urls.getCompCouponsByPrice + +price
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

  handleChangePage = (_event: unknown, newPage: number) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  public render(): JSX.Element {
    return (
      <div className="CompanyCouponsTable">
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
            {categories.map((item) => (
              <MenuItem key={item.value} value={item.label}>
                {item.label}
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
        <div className="CouponsTable">
          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className="TableHead" align="left">
                      Title
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Category
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Description
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Starts
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Expires
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Amount
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Price($)
                    </TableCell>
                    <TableCell className="TableHead" align="left">
                      Image
                    </TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.coupons
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((coupon) => {
                      return (
                        <TableRow key={coupon.id}>
                          <TableCell align="left">{coupon.title}</TableCell>
                          <TableCell align="left">{coupon.category}</TableCell>
                          <TableCell align="left">
                            {coupon.description}
                          </TableCell>
                          <TableCell align="left">{coupon.startDate}</TableCell>
                          <TableCell align="left">{coupon.endDate}</TableCell>
                          <TableCell align="left">{coupon.amount}</TableCell>
                          <TableCell align="left">{coupon.price}</TableCell>
                          <TableCell align="left">
                            <a href={globals.urls.couponImage + coupon.image}>
                              <img
                                src={globals.urls.couponImage + coupon.image}
                              />
                            </a>
                          </TableCell>
                          <TableCell align="left">
                            <NavLink to={"/company/coupons/" + coupon.id}>
                              <Button
                                size="small"
                                color="default"
                                className="IconEdit"
                              >
                                <EditIcon className="IconEdit" />
                              </Button>
                            </NavLink>
                          </TableCell>
                          <TableCell align="left">
                            <CouponDeleteConfirm coupon={coupon} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 15, 25]}
              component="div"
              count={this.state.coupons.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    );
  }

  public componentWillUnmount() {
    this.unsubscribeMe();
  }
}

export default CompanyCouponsTable;
