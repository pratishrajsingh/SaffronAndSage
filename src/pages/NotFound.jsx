import { Link, useLocation } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function NotFound() {
  useDocumentTitle("Page not found");
  const { pathname } = useLocation();

  return (
    <div className="container section not-found">
      <p className="not-found-code">404</p>
      <h1>This table isn't on our floor plan</h1>
      <p className="muted">
        We couldn't find <code>{pathname}</code>. It may have moved, or the link might be mistyped.
      </p>
      <div className="hero-actions center">
        <Link to="/" className="btn btn-primary">
          <Icon name="arrowLeft" size={18} /> Back to home
        </Link>
        <Link to="/menu" className="btn btn-outline">Browse the menu</Link>
      </div>
    </div>
  );
}

export default NotFound;
