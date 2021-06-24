import "./Home.css";
import clothing from "../../../Assets/Images/categories/clothing.jpg";
import gifts from "../../../Assets/Images/categories/gifts2.jpg";
import holidays from "../../../Assets/Images/categories/holidays.jpg";
import ad from "../../../Assets/Images/ads/ad.png";
import img1 from "../../../Assets/Images/ads/hamburg.jpg";
import img2 from "../../../Assets/Images/ads/borabora.jpg";
import img3 from "../../../Assets/Images/ads/london.jpg";
import img4 from "../../../Assets/Images/ads/abudahbi.jpg";
import img5 from "../../../Assets/Images/ads/maldives.jpg";
import { ArrowForward } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Categories from "../../GeneralArea/Categories/Categories";
import TopPicks from "../TopPicks/TopPicks";
import RandomImg from "../RandomImg/RandomImg";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <Typography className="Title" variant="h4">
        Buy Now and Save a Lot Later!
      </Typography>
      <div className="CategoryBox">
        <Categories categoryName="GIFTS" categoryImgSrc={gifts} />
        <Categories categoryName="HOLIDAYS" categoryImgSrc={holidays} />
        <Categories categoryName="CLOTHING" categoryImgSrc={clothing} />
      </div>
      <NavLink to="/categories">
        <Button className="BtnLink">
          for more categories &nbsp;
          <ArrowForward className="Arrow" />
        </Button>
      </NavLink>
      <div className="AdHome">
        <img src={ad} alt="ad-main" className="ImageMain" />
        <div>
          <span className="AdTxt">
            Save on last minute
            <br />
            getaways!
          </span>
          <NavLink to={"/categories/" + "TRAVEL"} className="AdLink">
            Learn More
          </NavLink>
        </div>
        <RandomImg images={[img1, img2, img3, img4, img5]} />
      </div>
      <div>
        <TopPicks />
      </div>
    </div>
  );
}

export default Home;
