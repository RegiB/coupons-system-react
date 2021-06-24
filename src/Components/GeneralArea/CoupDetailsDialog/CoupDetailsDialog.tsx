import "./CoupDetailsDialog.css";
import React, { useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CouponModel from "../../../Models/CouponModel";

interface CouponDetailsProps {
  coupon: CouponModel;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width:500,
  },
}))(MuiDialogContent);

function CoupDetailsDialog(props: CouponDetailsProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="CoupDetailsDialog">
      <Button color="primary" onClick={handleClickOpen}>
        More Details
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.coupon.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{props.coupon.description}</Typography>
          <Typography gutterBottom>
            <b>Category:</b> {props.coupon.category}
          </Typography>
          <Typography gutterBottom>
            <b>Start Date:</b> {props.coupon.startDate}
          </Typography>
          <Typography gutterBottom>
            <b>Expiration Date:</b> {props.coupon.endDate}
          </Typography>
          <Typography gutterBottom>
            <b>Amount:</b> {props.coupon.amount}
          </Typography>
          <Typography gutterBottom>
            <b>Price:</b> ${props.coupon.price}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CoupDetailsDialog;
