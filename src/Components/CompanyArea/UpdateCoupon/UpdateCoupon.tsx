import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { couponUpdatedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./UpdateCoupon.css";

interface State {
  title: string;
  category: string;
  amount: string;
  price: string;
  description: string;
}

interface RouteParams {
  id: string;
}

interface UpdateCouponProps extends RouteComponentProps<RouteParams> {}

function UpdateCoupon(props: UpdateCouponProps): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CouponModel>();
  const [state] = useState({
    coupon: store
      .getState()
      .couponsState.coupons.find(
        (coupon) => coupon.id === +props.match.params.id
      ),
  });
  const [category, setCategory] = useState(state.coupon.category);
  const categories = [
    { value: 1, label: "ACCESSORIES" },
    { value: 2, label: "BABY" },
    { value: 3, label: "BEAUTY" },
    { value: 4, label: "CINEMA" },
    { value: 5, label: "CLOTHING" },
    { value: 6, label: "FLOWERS" },
    { value: 7, label: "FOOD" },
    { value: 8, label: "GIFTS" },
    { value: 9, label: "HOLIDAYS" },
    { value: 10, label: "PETS" },
    { value: 11, label: "SPORTS" },
    { value: 12, label: "TRAVEL" },
  ];
  const [values, setValues] = useState<State>({
    title: state.coupon.title,
    category: state.coupon.category,
    price: state.coupon.price.toString(),
    amount: state.coupon.amount.toString(),
    description: state.coupon.description,
  });

  const handleChangeCategory = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  async function send(coupon: CouponModel) {
    const myFormData = new FormData();
    myFormData.append("id", props.match.params.id);
    myFormData.append("title", coupon.title);
    myFormData.append("category", category);
    myFormData.append("startDate", coupon.startDate.toString());
    myFormData.append("endDate", coupon.endDate.toString());
    myFormData.append("price", coupon.price.toString());
    myFormData.append("amount", coupon.amount.toString());
    myFormData.append("description", coupon.description);
    myFormData.append("image", state.coupon.image);

    if (coupon.imageFile.item(0)) {
      myFormData.append("imageFile", coupon.imageFile.item(0));
    }

    try {
      if (
        coupon.title !== state.coupon.title ||
        category !== state.coupon.category ||
        coupon.startDate !== state.coupon.startDate ||
        coupon.endDate !== state.coupon.endDate ||
        coupon.price.toString() !== state.coupon.price.toString() ||
        coupon.amount.toString() !== state.coupon.amount.toString() ||
        coupon.description !== state.coupon.description ||
        (coupon.imageFile.length !== 0 &&
          coupon.imageFile.item(0).toString() !== state.coupon.image)
      ) {
        const response = await jwtAxios.put<CouponModel>(
          globals.urls.updateCoupon,
          myFormData
        );
        const updatedCoupon = response.data;
        store.dispatch(couponUpdatedAction(updatedCoupon));
        notify.success("Coupon updated!");
        history.push("/company/coupons");
      }
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="UpdateCoupon">
      <Typography variant="h4" className="TitleMain">
        Update Coupon:
      </Typography>
      <br />
      <form onSubmit={handleSubmit(send)} encType="multipart/form-data">
        <div className="Field1">
          <TextField
            required
            className="FieldText"
            name="title"
            label="Title:"
            type="text"
            variant="outlined"
            defaultValue={state.coupon.title}
            inputRef={register({ minLength: 3 })}
            onChange={handleChange("title")}
            error={values.title !== "" && values.title.length < 3}
            helperText={
              values.title && values.title.length < 3
                ? "Title must be at least 3 characters long"
                : ""
            }
          />
          <Select
            required
            type="select"
            className="FieldText"
            name="category"
            defaultValue={state.coupon.category}
            onChange={handleChangeCategory}
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Choose Category *
            </MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.value} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <TextField
            required
            className="FieldText"
            type="Date"
            name="startDate"
            label="Start Date:"
            defaultValue={state.coupon.startDate}
            inputRef={register}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            className="FieldText"
            type="Date"
            name="endDate"
            label="Expiration Date:"
            defaultValue={state.coupon.endDate}
            inputRef={register}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <br />
          <br />
          <TextField
            required
            type="number"
            className="FieldText"
            name="amount"
            label="Amount:"
            variant="outlined"
            defaultValue={state.coupon.amount}
            inputProps={{
              min: 1,
            }}
            inputRef={register({ min: 1 })}
            onChange={handleChange("amount")}
            error={
              (values.amount !== "" && values.amount === "0") ||
              values.amount.startsWith("-")
            }
            helperText={
              (values.amount !== "" && values.amount === "0") ||
              values.amount.startsWith("-")
                ? "Amount must be more than 0"
                : ""
            }
          />
          <TextField
            required
            className="FieldText"
            type="number"
            name="price"
            label="Price: ($)"
            variant="outlined"
            defaultValue={state.coupon.price}
            inputProps={{
              step: 0.01,
              min: 0.01,
            }}
            inputRef={register({ min: 0.01 })}
            onChange={handleChange("price")}
            error={
              (values.price !== "" && values.price === "0") ||
              values.price.startsWith("-")
            }
            helperText={
              (values.price !== "" && values.price === "0") ||
              values.price.startsWith("-")
                ? "Price must be more than 0"
                : ""
            }
          />
        </div>
        <div className="Field2">
          <TextField
            required
            className="FieldText2"
            multiline
            rows="3"
            type="text"
            name="description"
            label="Description:"
            variant="outlined"
            defaultValue={state.coupon.description}
            inputRef={register({ minLength: 3 })}
            onChange={handleChange("description")}
            error={values.description !== "" && values.description.length < 3}
            helperText={
              values.description && values.description.length < 3
                ? "Description must be at least 3 characters long"
                : ""
            }
          />
          <br />
          <br />
          <TextField
            className="FieldText2"
            name="imageFile"
            type="file"
            variant="standard"
            inputRef={register}
          />
          <br />
          <br />
          <Button variant="contained" type="submit" className="AddUpdateBtn">
            update
          </Button>
          <br />
          <br />
          <NavLink className="CancelLink" to={"/company/coupons"}>
            cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default UpdateCoupon;
