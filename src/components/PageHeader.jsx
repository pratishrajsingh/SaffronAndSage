import { Link } from "react-router-dom";

function PageHeader({ eyebrow, title, subtitle, crumbs = [], children }) {
  return (
    <section className="page-header">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label}>
                <span className="crumb-sep">/</span>
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-header-sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export default PageHeader;
