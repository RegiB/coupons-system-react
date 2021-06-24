import { Button, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import accessories from "../../../Assets/Images/categories/accessories.jpg";
import baby from "../../../Assets/Images/categories/baby.jpg";
import beauty from "../../../Assets/Images/categories/beauty.jpg";
import cinema from "../../../Assets/Images/categories/cinema.jpg";
import clothing from "../../../Assets/Images/categories/clothing.jpg";
import flowers from "../../../Assets/Images/categories/flowers.jpg";
import food from "../../../Assets/Images/categories/food.jpg";
import gifts from "../../../Assets/Images/categories/gifts2.jpg";
import holidays from "../../../Assets/Images/categories/holidays.jpg";
import pets from "../../../Assets/Images/categories/pets.jpg";
import sports from "../../../Assets/Images/categories/sports.jpg";
import travel from "../../../Assets/Images/categories/travel.jpg";
import CategoriesLinks from "../CategoriesLinks/CategoriesLinks";
import "./CategoriesList.css";

function CategoriesList(): JSX.Element {
  return (
    <div className="CategoriesList">
      <Typography className="TitleTop" variant="h4">
        Browse Coupons by Categories:
      </Typography>
      <div className="CategoryBox">
        <CategoriesLinks
          categoryName="ACCESSORIES"
          categoryImgSrc={accessories}
        />
        <CategoriesLinks categoryName="BABY" categoryImgSrc={baby} />
        <CategoriesLinks categoryName="BEAUTY" categoryImgSrc={beauty} />
        <CategoriesLinks categoryName="CINEMA" categoryImgSrc={cinema} />
        <CategoriesLinks categoryName="CLOTHING" categoryImgSrc={clothing} />
        <CategoriesLinks categoryName="FLOWERS" categoryImgSrc={flowers} />
        <CategoriesLinks categoryName="FOOD" categoryImgSrc={food} />
        <CategoriesLinks categoryName="GIFTS" categoryImgSrc={gifts} />
        <CategoriesLinks categoryName="HOLIDAYS" categoryImgSrc={holidays} />
        <CategoriesLinks categoryName="PETS" categoryImgSrc={pets} />
        <CategoriesLinks categoryName="SPORTS" categoryImgSrc={sports} />
        <CategoriesLinks categoryName="TRAVEL" categoryImgSrc={travel} />
      </div>
      <NavLink to="/home" className="LinkForward">
        <Button>Back</Button>
      </NavLink>
    </div>
  );
}

export default CategoriesList;
