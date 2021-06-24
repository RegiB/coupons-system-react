import CustomerModel from "../Models/CustomerModel";

export class CustomerState {
  public customers: CustomerModel[] = [];
}

export enum CustomerActionType {
  CustomersDownloaded = "CustomersDownloaded",
  CustomerAdded = "CustomerAdded",
  CustomerUpdated = "CustomerUpdated",
  CustomerDeleted = "CustomerDeleted",
}

export interface CustomerAction {
  type: CustomerActionType;
  payload: any;
}

export function customerDownloadedAction(
  customers: CustomerModel[]
): CustomerAction {
  return { type: CustomerActionType.CustomersDownloaded, payload: customers };
}
export function customerAddedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomerActionType.CustomerAdded, payload: customer };
}
export function customerUpdatedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomerActionType.CustomerUpdated, payload: customer };
}
export function customerDeletedAction(id: number): CustomerAction {
  return { type: CustomerActionType.CustomerDeleted, payload: id };
}

export function customerReducer(
  currState: CustomerState = new CustomerState(),
  action: CustomerAction
): CustomerState {
  const newState = { ...currState };

  switch (action.type) {
    case CustomerActionType.CustomersDownloaded:
      newState.customers = action.payload;
      break;
    case CustomerActionType.CustomerAdded:
      newState.customers.push(action.payload);
      break;
    case CustomerActionType.CustomerUpdated:
      newState.customers = newState.customers.map((customer) =>
        customer.id === action.payload.id
          ? {
              ...customer,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              email: action.payload.email,
              password: action.payload.password,
            }
          : customer
      );
      break;
    case CustomerActionType.CustomerDeleted:
      newState.customers = newState.customers.filter(
        (customer) => customer.id !== action.payload
      );
      break;
    default:
      break;
  }
  return newState;
}
