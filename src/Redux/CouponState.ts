import CouponModel from "../Models/CouponModel";

export class CouponState {
  public coupons: CouponModel[] = [];
}

export enum CouponActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted",
}

export interface CouponAction {
  type: CouponActionType;
  payload: any;
}

export function couponDownloadedAction(coupons: CouponModel[]): CouponAction {
  return { type: CouponActionType.CouponsDownloaded, payload: coupons };
}
export function couponAddedAction(coupon: CouponModel): CouponAction {
  return { type: CouponActionType.CouponAdded, payload: coupon };
}
export function couponUpdatedAction(coupon: CouponModel): CouponAction {
  return { type: CouponActionType.CouponUpdated, payload: coupon };
}
export function couponDeletedAction(id: number): CouponAction {
  return { type: CouponActionType.CouponDeleted, payload: id };
}

export function couponsReducer(
  currState: CouponState = new CouponState(),
  action: CouponAction
): CouponState {
  const newState = { ...currState };

  switch (action.type) {
    case CouponActionType.CouponsDownloaded:
      newState.coupons = action.payload;
      break;
    case CouponActionType.CouponAdded:
      newState.coupons.push(action.payload);
      break;
    case CouponActionType.CouponUpdated:
      newState.coupons = newState.coupons.map((coupon) =>
        coupon.id === action.payload.id
          ? {
              ...coupon,
              category: action.payload.category,
              title: action.payload.title,
              description: action.payload.description,
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
              amount: action.payload.amount,
              price: action.payload.price,
              image: action.payload.image,
            }
          : coupon
      );
      break;
    case CouponActionType.CouponDeleted:
      newState.coupons = newState.coupons.filter(
        (coupon) => coupon.id !== action.payload
      );
      break;
    default:
      break;
  }
  return newState;
}
