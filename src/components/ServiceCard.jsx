import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

function ServiceCard({ service }) {
  return (
    <Link to={`/services/${service.slug}`} className="service-card">
      <span className="service-icon">
        <Icon name={service.icon} size={24} />
      </span>
      <h3>{service.title}</h3>
      <p className="muted">{service.summary}</p>
      <span className="link-arrow">
        Learn more <Icon name="arrowRight" size={16} />
      </span>
    </Link>
  );
}

export default ServiceCard;
