export const fetchFilterMeal = async (value) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
  const data = await response.json();
  return data.meals;
};

export const fetchFilterDrink = async (value) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
  const data = await response.json();
  return data.drinks;
};
