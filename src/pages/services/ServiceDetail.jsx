import { Link, useParams } from "react-router-dom";
import Icon from "../../components/Icon.jsx";
import { EmptyState } from "../../components/Feedback.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import services from "../../data/services.js";
import { formatPrice } from "../../utils/format.js";

function ServiceDetail() {
  const { serviceSlug } = useParams();
  const service = services.find((item) => item.slug === serviceSlug);
  useDocumentTitle(service ? service.title : "Service not found");

  if (!service) {
    return (
      <EmptyState icon="alert" title="Service not found" text={`We don't offer "${serviceSlug}" yet.`}>
        <Link to="/services" className="btn btn-primary">See all services</Link>
      </EmptyState>
    );
  }

  const currentIndex = services.indexOf(service);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <article className="service-detail">
      <div className="service-hero">
        <span className="service-icon large">
          <Icon name={service.icon} size={30} />
        </span>
        <div>
          <h2>{service.title}</h2>
          <p className="service-tagline">{service.tagline}</p>
        </div>
      </div>

      <p className="lead">{service.description}</p>

      <h3>What's included</h3>
      <ul className="feature-list">
        {service.features.map((feature) => (
          <li key={feature}>
            <Icon name="check" size={18} /> {feature}
          </li>
        ))}
      </ul>

      <h3>Packages &amp; pricing</h3>
      <div className="package-grid">
        {service.packages.map((pkg, index) => (
          <div className={`package-card ${index === 1 ? "featured" : ""}`} key={pkg.name}>
            {index === 1 && <span className="package-badge">Most popular</span>}
            <h4>{pkg.name}</h4>
            <p className="package-price">{pkg.price === 0 ? "Free" : formatPrice(pkg.price)}</p>
            <p className="muted">{pkg.details}</p>
          </div>
        ))}
      </div>

      <div className="service-footer">
        <Link to={service.cta.to} className="btn btn-primary btn-lg">
          {service.cta.label} <Icon name="arrowRight" size={18} />
        </Link>
        <Link to={`/services/${nextService.slug}`} className="link-arrow">
          Next: {nextService.title} <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}

export default ServiceDetail;
