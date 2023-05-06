import { useLocation } from 'react-router-dom';
import HomeHeader from '../pages/Home/HomeHeader';
import MealsHeader from '../pages/Meals/MealsHeader';
import DrinksHeader from '../pages/Drinks/DrinksHeader';
import ProfileHeader from '../pages/Profile/ProfileHeader';
import DoneRecipesHeader from '../pages/DoneRecipes/DoneRecipesHeader';
import FavoriteRecipesHeader from '../pages/FavoriteRecipes/FavoriteRecipesHeader';

function Header() {
  const { pathname } = useLocation();
  // se for algo que contenha id da receita ou inprogress ele usa o mesmo componente do home
  const onIncludes = pathname.includes(':id-da-receita')
      || pathname.includes('in-progress');

  if (onIncludes) return <HomeHeader />;
  // para todos os casos de rota renderiza um header diferente
  switch (pathname) {
  case '/':
    return <HomeHeader />;
  case '/meals':
    return <MealsHeader />;
  case '/drinks':
    return <DrinksHeader />;
  case '/profile':
    return <ProfileHeader />;
  case '/done-recipes':
    return <DoneRecipesHeader />;
  case '/favorite-recipes':
    return <FavoriteRecipesHeader />;
  default:
    return null;
  }
}

export default Header;
