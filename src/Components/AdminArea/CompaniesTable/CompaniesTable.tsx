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
import { ChangeEvent, Component } from "react";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companyDownloadedAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import EditIcon from "@material-ui/icons/Edit";
import { Unsubscribe } from "redux";
import CompanyDeleteConfirm from "../CompanyDeleteConfirm/CompanyDeleteConfirm";
import "./CompaniesTable.css";

interface CompaniesTableState {
  companies: CompanyModel[];
  rowsPerPage: number;
  page: number;
}

class CompaniesTable extends Component<{}, CompaniesTableState> {
  private unsubscribeMe: Unsubscribe;

  public constructor(props: {}) {
    super(props);
    this.state = {
      companies: store.getState().companyState.companies,
      rowsPerPage: 10,
      page: 0,
    };
  }

  public async componentDidMount() {
    try {
      if (store.getState().companyState.companies.length === 0) {
        const response = await jwtAxios.get<CompanyModel[]>(
          globals.urls.getAllCompanies
        );
        this.setState({ companies: response.data });
        store.dispatch(companyDownloadedAction(response.data));
      }
      this.unsubscribeMe = store.subscribe(() => {
        this.setState({ companies: store.getState().companyState.companies });
      });
    } catch (error) {
      notify.error(error);
    }
  }

  handleChangePage = (_event: unknown, newPage: number) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };

  public render(): JSX.Element {
    return (
      <div className="CompaniesTable">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="TableHead" align="left">
                    Name
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
                {this.state.companies
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((company) => {
                    return (
                      <TableRow key={company.id}>
                        <TableCell align="left">{company.name}</TableCell>
                        <TableCell align="left">{company.email}</TableCell>
                        <TableCell align="left">{company.password}</TableCell>
                        <TableCell align="left">
                          <NavLink to={"/admin/companies/" + company.id}>
                            <Button size="small" color="default">
                              <EditIcon className="IconEdit" />
                            </Button>
                          </NavLink>
                        </TableCell>
                        <TableCell align="left">
                          <CompanyDeleteConfirm company={company} />
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
            count={this.state.companies.length}
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

export default CompaniesTable;
