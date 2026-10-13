import CategoryCard from "../../components/CategoryCard.jsx";
import SectionTitle from "../../components/SectionTitle.jsx";
import { SkeletonGrid, ErrorMessage } from "../../components/Feedback.jsx";
import useFetch from "../../hooks/useFetch.js";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { ENDPOINTS } from "../../services/api.js";

function shorten(text, maxLength = 110) {
  const firstSentence = text.split(/(?<=\.)\s/)[0];
  return firstSentence.length > maxLength
    ? `${firstSentence.slice(0, maxLength).trim()}…`
    : firstSentence;
}

function Categories() {
  useDocumentTitle("Menu");
  const { data, loading, error, refetch } = useFetch(ENDPOINTS.categories);

  return (
    <>
      <SectionTitle
        title="All categories"
        subtitle={data ? `${data.categories.length} categories to explore` : "Pick a category to see its dishes"}
        align="left"
      />

      {loading && <SkeletonGrid count={8} />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {data && (
        <div className="category-grid">
          {data.categories.map((category) => (
            <CategoryCard
              key={category.idCategory}
              name={category.strCategory}
              image={category.strCategoryThumb}
              description={shorten(category.strCategoryDescription)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Categories;
