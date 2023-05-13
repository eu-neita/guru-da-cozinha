export const recipeFormat = (r, pathname) => {
  if (pathname.includes('meals')) {
    return ({
      id: r.idMeal,
      type: 'meal',
      nationality: r.strArea,
      category: r.strCategory,
      alcoholicOrNot: '',
      name: r.strMeal,
      image: r.strMealThumb,
    });
  }
  return ({
    id: r.idDrink,
    type: 'drink',
    nationality: '',
    category: r.strCategory,
    alcoholicOrNot: r.strAlcoholic,
    name: r.strDrink,
    image: r.strDrinkThumb,
  });
};
