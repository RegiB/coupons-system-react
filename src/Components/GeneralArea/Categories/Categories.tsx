import "./Categories.css";

interface CategoriesProps {
  categoryImgSrc: string;
  categoryName: string;
}

function Categories(props: CategoriesProps): JSX.Element {
  return (
    <div className="Categories">
      <img src={props.categoryImgSrc} alt="coupon-categories" />
      <span>{props.categoryName}</span>
    </div>
  );
}

export default Categories;
