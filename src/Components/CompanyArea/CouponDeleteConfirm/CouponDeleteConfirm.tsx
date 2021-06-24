import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import { couponDeletedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import DeleteIcon from "@material-ui/icons/Delete";
import CouponModel from "../../../Models/CouponModel";

interface CouponDeleteConfirmProps {
  coupon: CouponModel;
}

function CouponDeleteConfirm(props: CouponDeleteConfirmProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [, setState] = useState(store.getState().couponsState.coupons);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteCoupon(id: number) {
    try {
      const response = jwtAxios.delete(globals.urls.deleteCoupon + id);
      store.dispatch(couponDeletedAction(id));
      setState(store.getState().couponsState.coupons);
      notify.success("Coupon deleted!");
    } catch (error) {
      notify.error(error);
    }
  }
  return (
    <div className="CouponDeleteConfirm">
      <Button size="small" color="default" onClick={handleClickOpen}>
        <DeleteIcon className="IconDelete" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>{"Are You Sure?"}</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to permanently remove coupon: <b>{props.coupon.title}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteCoupon(props.coupon.id)}
            color="secondary"
            autoFocus
            className="DeleteBtn"
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="default" className="CancelBtn">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CouponDeleteConfirm;
