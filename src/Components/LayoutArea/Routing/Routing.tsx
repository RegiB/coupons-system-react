import { Route, Switch, Redirect } from "react-router-dom";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import CategoriesList from "../../GeneralArea/CategoriesList/CategoriesList";
import CouponsList from "../../GeneralArea/CouponsList/CouponsList";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../../SharedArea/Page404/Page404";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CompaniesTable from "../../AdminArea/CompaniesTable/CompaniesTable";
import CustomersTable from "../../AdminArea/CustomersTable/CustomersTable";
import CompanyCouponsTable from "../../CompanyArea/CompanyCouponsTable/CompanyCouponsTable";
import AdminRequired from "../../AdminArea/AdminRequired/AdminRequired";
import CompanyRequired from "../../CompanyArea/CompanyRequired/CompanyRequired";
import CustomerRequired from "../../CustomerArea/CustomerRequired/CustomerRequired";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        {/* Route for general- open pages for all */}
        <Route path="/home" component={Home} exact />
        <Route path="/categories" component={CategoriesList} exact />
        <Route path="/categories/:category" component={CouponsList} exact />
        {/* Admin */}
        <Route path="/admin/companies" component={AdminRequired(CompaniesTable)} exact />
        <Route path="/admin/add-company" component={AdminRequired(AddCompany)} exact />
        <Route path="/admin/companies/:id" component={UpdateCompany} exact />
        <Route path="/admin/customers" component={AdminRequired(CustomersTable)} exact />
        <Route path="/admin/add-customer" component={AdminRequired(AddCustomer)} exact />
        <Route path="/admin/customers/:id" component={UpdateCustomer} exact />
        {/* Company */}
        <Route path="/company/home" component={CompanyRequired(CompanyDetails)} exact />
        <Route path="/company/coupons" component={CompanyRequired(CompanyCouponsTable)} exact />
        <Route path="/company/add-coupon" component={CompanyRequired(AddCoupon)} exact />
        <Route path="/company/coupons/:id" component={UpdateCoupon} exact />
        {/* Customer */}
        <Route path="/customer/details" component={CustomerRequired(CustomerDetails)} exact />
        <Route path="/customer/coupons" component={CustomerRequired(CustomerCoupons)} exact />
        {/* Login / Logout */}
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        {/* Default routing */}
        <Redirect from="/" to="/home" exact />
        {/* Page not found */}
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Routing;
