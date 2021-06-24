import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import CouponModel from "../../../Models/CouponModel";
import { couponAddedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notification";
import "./AddCoupon.css";

interface State {
  title: string;
  category: string;
  amount: string;
  price: string;
  description: string;
}

function AddCoupon(): JSX.Element {
  const [category, setCategory] = useState("");
  const history = useHistory();
  const { register, handleSubmit } = useForm<CouponModel>();
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
    title: "",
    category: "",
    price: "",
    amount: "",
    description: "",
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
    myFormData.append("title", coupon.title);
    myFormData.append("category", category);
    myFormData.append("startDate", coupon.startDate.toString());
    myFormData.append("endDate", coupon.endDate.toString());
    myFormData.append("price", coupon.price.toString());
    myFormData.append("amount", coupon.amount.toString());
    myFormData.append("description", coupon.description);
    myFormData.append("image", coupon.imageFile.item(0).name);
    myFormData.append("imageFile", coupon.imageFile.item(0));

    try {
      const response = await jwtAxios.post<CouponModel>(
        globals.urls.addCoupon,
        myFormData
      );
      const addedCoupon = response.data;
      store.dispatch(couponAddedAction(addedCoupon));
      notify.success("Coupon added!");
      history.push("/company/coupons");
    } catch (error) {
      notify.error(error);
    }
  }

  return (
    <div className="AddCoupon">
      <Typography variant="h4" className="TitleMain">
        Add Coupon:
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
            displayEmpty
            defaultValue={""}
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
            required
            className="FieldText2"
            name="imageFile"
            type="file"
            variant="standard"
            inputRef={register}
          />
          <br />
          <br />
          <Button variant="contained" type="submit" className="AddUpdateBtn">
            add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
