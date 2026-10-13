// The API has no prices or ratings, so we derive stable ones from the meal id
export function getPrice(id) {
  return 180 + (Number(id) % 37) * 15;
}

export function getRating(id) {
  return (3.8 + (Number(id) % 12) / 10).toFixed(1);
}

// Converts a raw API meal into the dish shape used across the app
export function toDish(meal) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || "",
    area: meal.strArea || "",
    price: getPrice(meal.idMeal),
    rating: getRating(meal.idMeal),
  };
}

export function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (name) {
      ingredients.push({ name, measure: measure || "" });
    }
  }

  return ingredients;
}

export function sortDishes(dishes, sort) {
  const sorted = [...dishes];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}
