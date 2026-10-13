import { Link } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard.jsx";
import Icon from "../../components/Icon.jsx";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import services from "../../data/services.js";

const PROCESS = [
  { step: "01", title: "Tell us what you need", text: "Book online, call us, or send an enquiry through the contact form." },
  { step: "02", title: "We plan it together", text: "Our team suggests menus, timings and setup tailored to your guests." },
  { step: "03", title: "Enjoy the occasion", text: "We cook, serve and clean up, so you can focus on the people." },
];

function ServicesOverview() {
  useDocumentTitle("Services");

  return (
    <>
      <div className="intro-block">
        <h2>Our services</h2>
        <p className="muted">
          Four ways to experience our kitchen. Pick a service from the list to see what's included,
          package pricing and how to book.
        </p>
      </div>

      <div className="service-grid two-col">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="card process-card">
        <h3>How it works</h3>
        <ol className="process-list">
          {PROCESS.map((item) => (
            <li key={item.step}>
              <span className="process-step">{item.step}</span>
              <div>
                <strong>{item.title}</strong>
                <p className="muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/contact?subject=General Service Enquiry" className="btn btn-primary">
          <Icon name="mail" size={18} /> Talk to our team
        </Link>
      </div>
    </>
  );
}

export default ServicesOverview;
