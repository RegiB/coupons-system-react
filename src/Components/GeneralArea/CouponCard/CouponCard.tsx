import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CouponModel from "../../../Models/CouponModel";
import { couponAddedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import CoupDetailsDialog from "../CoupDetailsDialog/CoupDetailsDialog";
import "./CouponCard.css";

interface CouponCardProps {
  coupon: CouponModel;
  couponLink: string;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 10,
  },
  media: {
    height: 150,
  },
});

function CouponCard(props: CouponCardProps): JSX.Element {
  const classes = useStyles();

  async function purchaseCoupon(coupon: CouponModel) {
    try {
      const response = await jwtAxios.post<CouponModel>(
        globals.urls.buyCoupon,
        coupon
      );
      const addedCoupon = response.data;
      store.dispatch(couponAddedAction(addedCoupon));
      notify.success("Coupon purchased! :)");
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="CouponCard">
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={globals.urls.couponImage + props.coupon.image}
          title={props.coupon.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.coupon.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            noWrap
          >
            {props.coupon.description}
            <br />
            Price: ${props.coupon.price}
          </Typography>
        </CardContent>
        <CardActions>
          <CoupDetailsDialog coupon={props.coupon} />
          {store.getState().authState.user &&
            store.getState().authState.user.clientType === "CUSTOMER" && (
              <Button size="small" onClick={() => purchaseCoupon(props.coupon)}>
                Purchase
              </Button>
            )}
        </CardActions>
      </Card>
    </div>
  );
}

export default CouponCard;
