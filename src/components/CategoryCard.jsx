import { Link } from "react-router-dom";

function CategoryCard({ name, image, description }) {
  return (
    <Link to={`/menu/category/${name}`} className="category-card">
      <div className="category-card-media">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="category-card-body">
        <h3>{name}</h3>
        {description && <p className="muted">{description}</p>}
      </div>
    </Link>
  );
}

export default CategoryCard;
