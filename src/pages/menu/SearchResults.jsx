import { Link, useSearchParams } from "react-router-dom";
import DishCard from "../../components/DishCard.jsx";
import { SkeletonGrid, ErrorMessage, EmptyState } from "../../components/Feedback.jsx";
import useFetch from "../../hooks/useFetch.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { ENDPOINTS } from "../../services/api.js";
import { toDish } from "../../utils/menu.js";

const SUGGESTIONS = ["Curry", "Pasta", "Chicken", "Cake", "Soup", "Salmon"];

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  useDocumentTitle(query ? `Search: ${query}` : "Search");

  // Skip the request entirely when there's no query
  const { data, loading, error, refetch } = useFetch(query ? ENDPOINTS.search(query) : null);
  const dishes = (data?.meals || []).map(toDish);

  const suggestionLinks = (
    <div className="chip-row">
      {SUGGESTIONS.map((item) => (
        <Link key={item} to={`/menu/search?q=${item}`} className="chip">{item}</Link>
      ))}
    </div>
  );

  if (!query) {
    return (
      <EmptyState title="What are you hungry for?" text="Type a dish name above, or try one of these:">
        {suggestionLinks}
      </EmptyState>
    );
  }

  if (loading) return <SkeletonGrid count={8} />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  if (dishes.length === 0) {
    return (
      <EmptyState title={`No results for "${query}"`} text="Check the spelling or try a broader term:">
        {suggestionLinks}
      </EmptyState>
    );
  }

  return (
    <>
      <div className="toolbar">
        <div>
          <h2 className="toolbar-title">Results for “{query}”</h2>
          <p className="muted">{dishes.length} {dishes.length === 1 ? "dish" : "dishes"} found</p>
        </div>
      </div>
      <div className="card-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </>
  );
}

export default SearchResults;
