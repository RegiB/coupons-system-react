import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useState } from "react";
import { customerDeletedAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomerModel from "../../../Models/CustomerModel";

interface CustomerDeleteConfirmProps {
  customer: CustomerModel;
}

function CustomerDeleteConfirm(props: CustomerDeleteConfirmProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [, setState] = useState(store.getState().customersState.customers);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteCustomer(id: number) {
    try {
      const response = jwtAxios.delete(globals.urls.deleteCustomer + id);
      if (response) {
        store.dispatch(customerDeletedAction(id));
        setState(store.getState().customersState.customers);
        notify.success("Customer deleted!");
      }
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="CustomerDeleteConfirm">
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
            Do you want to permanently remove customer: <b>{props.customer.firstName}&nbsp;{props.customer.lastName}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteCustomer(props.customer.id)}
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

export default CustomerDeleteConfirm;
