import CompanyModel from "../Models/CompanyModel";

export class CompanyState {
  public companies: CompanyModel[] = [];
}

export enum CompanyActionType {
  CompanyDownloaded = "CompanyDownloaded",
  CompanyAdded = "CompanyAdded",
  CompanyUpdated = "CompanyUpdated",
  CompanyDeleted = "CompanyDeleted",
}

export interface CompanyAction {
  type: CompanyActionType;
  payload: any;
}

export function companyDownloadedAction(
  companies: CompanyModel[]
): CompanyAction {
  return { type: CompanyActionType.CompanyDownloaded, payload: companies };
}
export function companyAddedAction(company: CompanyModel): CompanyAction {
  return { type: CompanyActionType.CompanyAdded, payload: company };
}
export function companyUpdatedAction(company: CompanyModel): CompanyAction {
  return { type: CompanyActionType.CompanyUpdated, payload: company };
}
export function companyDeletedAction(id: number): CompanyAction {
  return { type: CompanyActionType.CompanyDeleted, payload: id };
}

export function companyReducer(
  currState: CompanyState = new CompanyState(),
  action: CompanyAction
): CompanyState {
  const newState = { ...currState };

  switch (action.type) {
    case CompanyActionType.CompanyDownloaded:
      newState.companies = action.payload;
      break;
    case CompanyActionType.CompanyAdded:
      newState.companies.push(action.payload);
      break;
    case CompanyActionType.CompanyUpdated:
      newState.companies = newState.companies.map((company) =>
        company.id === action.payload.id
          ? {
              ...company,
              email: action.payload.email,
              password: action.payload.password
            }
          : company
      );
      break;
    case CompanyActionType.CompanyDeleted:
      newState.companies = newState.companies.filter(
        (company) => company.id !== action.payload
      );
      break;
    default:
      break;
  }
  return newState;
}
