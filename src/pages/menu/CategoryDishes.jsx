import { Link, useParams, useSearchParams } from "react-router-dom";
import DishCard from "../../components/DishCard.jsx";
import Icon from "../../components/Icon.jsx";
import { SkeletonGrid, ErrorMessage, EmptyState } from "../../components/Feedback.jsx";
import useFetch from "../../hooks/useFetch.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { ENDPOINTS } from "../../services/api.js";
import { toDish, sortDishes } from "../../utils/menu.js";
import { SORT_OPTIONS } from "../../data/siteData.js";

function CategoryDishes() {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  useDocumentTitle(`${categoryName} Dishes`);

  const { data, loading, error, refetch } = useFetch(ENDPOINTS.byCategory(categoryName));

  // Filter and sort state live in the URL, so they survive refresh and can be shared
  const filter = searchParams.get("filter") || "";
  const sort = searchParams.get("sort") || "popular";

  const updateParam = (key, value, defaultValue = "") => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== defaultValue) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const allDishes = (data?.meals || []).map((meal) => ({ ...toDish(meal), category: categoryName }));
  const visibleDishes = sortDishes(
    allDishes.filter((dish) => dish.name.toLowerCase().includes(filter.toLowerCase())),
    sort
  );

  if (loading) return <SkeletonGrid count={8} />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  if (allDishes.length === 0) {
    return (
      <EmptyState
        icon="utensils"
        title={`No "${categoryName}" category`}
        text="This category doesn't exist or has no dishes yet."
      >
        <Link to="/menu" className="btn btn-primary">Browse all categories</Link>
      </EmptyState>
    );
  }

  return (
    <>
      <div className="toolbar">
        <div>
          <h2 className="toolbar-title">{categoryName}</h2>
          <p className="muted">
            Showing {visibleDishes.length} of {allDishes.length} dishes
          </p>
        </div>

        <div className="toolbar-controls">
          <label className="input-icon">
            <Icon name="search" size={16} />
            <input
              type="search"
              placeholder={`Filter ${categoryName.toLowerCase()} dishes`}
              value={filter}
              onChange={(e) => updateParam("filter", e.target.value)}
              aria-label="Filter dishes by name"
            />
          </label>

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value, "popular")}
            aria-label="Sort dishes"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {visibleDishes.length > 0 ? (
        <div className="card-grid">
          {visibleDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <EmptyState title="No matching dishes" text={`Nothing in ${categoryName} matches "${filter}".`}>
          <button className="btn btn-outline" onClick={() => updateParam("filter", "")}>
            Clear filter
          </button>
        </EmptyState>
      )}
    </>
  );
}

export default CategoryDishes;
