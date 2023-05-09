const fetchCategoryData = async (value) => {
  if (value === 'Meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.meals;
  }
  if (value === 'Drinks') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data.drinks;
  }
};

export default fetchCategoryData;
