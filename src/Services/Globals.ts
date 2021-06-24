class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // Admin:
    addCompany: "http://localhost:8080/api/admin/companies/",
    updateCompany: "http://localhost:8080/api/admin/companies/",
    deleteCompany: "http://localhost:8080/api/admin/companies/",
    getAllCompanies: "http://localhost:8080/api/admin/companies/",
    getOneCompany: "http://localhost:8080/api/admin/companies/",
    addCustomer: "http://localhost:8080/api/admin/customers/",
    updateCustomer: "http://localhost:8080/api/admin/customers/",
    deleteCustomer: "http://localhost:8080/api/admin/customers/",
    getAllCustomers: "http://localhost:8080/api/admin/customers/",
    getOneCustomer: "http://localhost:8080/api/admin/customers/",
    // Company:
    addCoupon: "http://localhost:8080/api/company/coupons/",
    couponImage: "http://localhost:8080/pics/",
    updateCoupon: "http://localhost:8080/api/company/coupons/",
    deleteCoupon: "http://localhost:8080/api/company/coupons/",
    getCompCoupons: "http://localhost:8080/api/company/coupons/",
    getCompCouponsByCategory: "http://localhost:8080/api/company/coupons/category/",
    getCompCouponsByPrice: "http://localhost:8080/api/company/coupons/price/",
    getCompCouponsPurchased: "http://localhost:8080/api/company/coupons/purchased/",
    getCompanyDetails: "http://localhost:8080/api/company/",
    // Customer:
    buyCoupon: "http://localhost:8080/api/customer/coupons/",
    getCustCoupons: "http://localhost:8080/api/customer/coupons/",
    getCustCouponsByCategory: "http://localhost:8080/api/customer/coupons/category/",
    getCustCouponsByPrice: "http://localhost:8080/api/customer/coupons/price/",
    getCustomerDetails: "http://localhost:8080/api/customer/",
    // General:
    getCouponsByCategory: "http://localhost:8080/api/general/coupons/",
    getTopPicks: "http://localhost:8080/api/general/coupons/top-picks/", 
    // Login
    login: "http://localhost:8080/api/login/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    // Admin:
    addCompany: "http://localhost:8080/api/admin/companies/",
    updateCompany: "http://localhost:8080/api/admin/companies/",
    deleteCompany: "http://localhost:8080/api/admin/companies/",
    getAllCompanies: "http://localhost:8080/api/admin/companies/",
    getOneCompany: "http://localhost:8080/api/admin/companies/",
    addCustomer: "http://localhost:8080/api/admin/customers/",
    updateCustomer: "http://localhost:8080/api/admin/customers/",
    deleteCustomer: "http://localhost:8080/api/admin/customers/",
    getAllCustomers: "http://localhost:8080/api/admin/customers/",
    getOneCustomer: "http://localhost:8080/api/admin/customers/",
    // Company:
    addCoupon: "http://localhost:8080/api/company/coupons/",
    couponImage: "http://localhost:8080/pics/",
    updateCoupon: "http://localhost:8080/api/company/coupons/",
    deleteCoupon: "http://localhost:8080/api/company/coupons/",
    getCompCoupons: "http://localhost:8080/api/company/coupons/",
    getCompCouponsByCategory: "http://localhost:8080/api/company/coupons/category/",
    getCompCouponsByPrice: "http://localhost:8080/api/company/coupons/price/",
    getCompCouponsPurchased: "http://localhost:8080/api/company/coupons/purchased/",
    getCompanyDetails: "http://localhost:8080/api/company/",
    // Customer:
    buyCoupon: "http://localhost:8080/api/customer/coupons/",
    getCustCoupons: "http://localhost:8080/api/customer/coupons/",
    getCustCouponsByCategory: "http://localhost:8080/api/customer/coupons/category/",
    getCustCouponsByPrice: "http://localhost:8080/api/customer/coupons/price/",
    getCustomerDetails: "http://localhost:8080/api/customer/",
    // General:
    getCouponsByCategory: "http://localhost:8080/api/general/coupons/",
    getTopPicks: "http://localhost:8080/api/general/coupons/top-picks/", 
    // Login
    login: "http://localhost:8080/api/login/",
  };
}

const globals =
  process.env.NODE_ENV === "development"
    ? new DevelopmentGlobals()
    : new ProductionGlobals();
export default globals;
