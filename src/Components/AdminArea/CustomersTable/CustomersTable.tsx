import { Component } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./CustomersTable.css";
import CustomerModel from "../../../Models/CustomerModel";
import {
  customerDeletedAction,
  customerDownloadedAction,
} from "../../../Redux/CustomerState";
import EditIcon from "@material-ui/icons/Edit";
import { Unsubscribe } from "redux";
import CustomerDeleteConfirm from "../CustomerDeleteConfirm/CustomerDeleteConfirm";

interface CustomersTableState {
  customers: CustomerModel[];
  rowsPerPage: number;
  page: number;
}

class CustomersTable extends Component<{}, CustomersTableState> {
  private unsubscribeMe: Unsubscribe;

  public constructor(props: {}) {
    super(props);
    this.state = {
      customers: store.getState().customersState.customers,
      rowsPerPage: 10,
      page: 0,
    };
  }

  public async componentDidMount() {
    try {
      if (store.getState().customersState.customers.length === 0) {
        const response = await jwtAxios.get<CustomerModel[]>(
          globals.urls.getAllCustomers
        );
        this.setState({ customers: response.data });
        store.dispatch(customerDownloadedAction(response.data));
      }
      this.unsubscribeMe = store.subscribe(() => {
        this.setState({ customers: store.getState().customersState.customers });
      });
    } catch (error) {
      notify.error(error);
    }
  }

  handleChangePage = (_event: unknown, newPage: number) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  public deleteCustomer(id: number) {
    try {
      const response = jwtAxios.delete(globals.urls.deleteCustomer + id);
      if (response) {
        store.dispatch(customerDeletedAction(id));
        this.setState({ customers: store.getState().customersState.customers });
        notify.success("Customer deleted!");
      }
    } catch (error) {
      notify.error(error);
    }
  }

  public render(): JSX.Element {
    return (
      <div className="CustomersTable">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="TableHead" align="left">
                    Full Name
                  </TableCell>
                  <TableCell className="TableHead" align="left">
                    Email
                  </TableCell>
                  <TableCell className="TableHead" align="left">
                    Password
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((customer) => {
                    return (
                      <TableRow key={customer.id}>
                        <TableCell align="left">
                          {customer.firstName}&nbsp;{customer.lastName}
                        </TableCell>
                        <TableCell align="left">{customer.email}</TableCell>
                        <TableCell align="left">{customer.password}</TableCell>
                        <TableCell align="left">
                          <NavLink to={"/admin/customers/" + customer.id}>
                            <Button size="small" color="default">
                              <EditIcon className="IconEdit" />
                            </Button>
                          </NavLink>
                        </TableCell>
                        <TableCell align="left">
                          <CustomerDeleteConfirm customer={customer} />
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
            count={this.state.customers.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
  public componentWillUnmount() {
    this.unsubscribeMe();
  }
}

export default CustomersTable;
