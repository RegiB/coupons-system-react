import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CouponModel from "../../../Models/CouponModel";
import globals from "../../../Services/Globals";
import CoupDetailsDialog from "../../GeneralArea/CoupDetailsDialog/CoupDetailsDialog";
import "./CustomerCouponCard.css";

interface CustomerCouponCardProps {
  coupon: CouponModel;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
});

function CustomerCouponCard(props: CustomerCouponCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className="CustomerCouponCard">
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
        </CardActions>
      </Card>
    </div>
  );
}

export default CustomerCouponCard;
