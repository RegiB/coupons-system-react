import "./CategoriesLinks.css";
import { NavLink } from "react-router-dom";

interface CategoriesLinksProps {
  categoryImgSrc: string;
  categoryName: string;
}

function CategoriesLinks(props: CategoriesLinksProps): JSX.Element {
  return (
    <div className="CategoriesLinks">
      <NavLink to={"/categories/" + props.categoryName}>
        <img src={props.categoryImgSrc} alt="coupon-categories" />
      </NavLink>
      <span>{props.categoryName}</span>
    </div>
  );
}

export default CategoriesLinks;
