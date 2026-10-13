import { NavLink, Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Icon from "../components/Icon.jsx";
import services from "../data/services.js";

function ServicesLayout() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="More than a restaurant"
        subtitle="Dine with us, celebrate with us, or let us bring the kitchen to you."
        crumbs={[{ label: "Services" }]}
      />

      <div className="container section-sm services-layout">
        <aside className="side-nav" aria-label="Services">
          <NavLink to="/services" end>
            <Icon name="globe" size={18} /> Overview
          </NavLink>
          {services.map((service) => (
            <NavLink key={service.slug} to={`/services/${service.slug}`}>
              <Icon name={service.icon} size={18} /> {service.title}
            </NavLink>
          ))}
        </aside>

        {/* Nested service pages render here */}
        <div className="services-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ServicesLayout;
