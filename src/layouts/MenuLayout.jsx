import { useRef } from "react";
import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Icon from "../components/Icon.jsx";
import { POPULAR_CATEGORIES } from "../data/siteData.js";

function MenuLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchRef.current.value.trim();

    if (query) {
      navigate(`/menu/search?q=${encodeURIComponent(query)}`);
    } else {
      searchRef.current.focus();
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Our Menu"
        title="Something for every craving"
        subtitle="Over 150 dishes from 25 cuisines, cooked fresh to order. Browse by category or search for a favourite."
      >
        <form className="menu-search" onSubmit={handleSearch} role="search">
          <Icon name="search" size={18} />
          <input
            ref={searchRef}
            // key resets the input when the URL query changes
            key={searchParams.get("q") || ""}
            type="search"
            defaultValue={searchParams.get("q") || ""}
            placeholder="Search dishes, e.g. curry, pasta, cake"
            aria-label="Search dishes"
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
      </PageHeader>

      <div className="container">
        <nav className="pill-nav" aria-label="Menu categories">
          <NavLink to="/menu" end>All categories</NavLink>
          {POPULAR_CATEGORIES.map((category) => (
            <NavLink key={category} to={`/menu/category/${category}`}>
              {category}
            </NavLink>
          ))}
        </nav>

        {/* Nested menu pages render here */}
        <div className="section-sm">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MenuLayout;
