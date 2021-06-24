import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { companyDeletedAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";

interface CompanyDeleteConfirmProps {
  company: CompanyModel;
}

function CompanyDeleteConfirm(props: CompanyDeleteConfirmProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [, setState] = useState(store.getState().companyState.companies);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteCompany(companyId: number) {
    setOpen(false);

    try {
      const response = jwtAxios.delete(globals.urls.deleteCompany + companyId);
      if (response) {
        store.dispatch(companyDeletedAction(companyId));
        setState(store.getState().companyState.companies);
        notify.success("Company deleted!");
      }
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="CompanyDeleteConfirm">
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
            Do you want to permanently remove company: <b>{props.company.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteCompany(props.company.id)}
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

export default CompanyDeleteConfirm;
