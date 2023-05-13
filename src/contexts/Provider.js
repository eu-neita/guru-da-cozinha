import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  // estado inicial - dados que vêm da API
  const [recipes, setRecipes] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // trouxe o array de recipes para o escopo global, pois será atualizado de acordo com os
  // filtros do componentes searchBar

  const valuesContext = useMemo(() => ({
    recipes,
    setRecipes,
    filterData,
    setFilterData,
    favoriteRecipes,
    setFavoriteRecipes,
  }), [
    recipes,
    setRecipes,
    filterData,
    setFilterData,
    favoriteRecipes,
    setFavoriteRecipes,
  ]);

  return (
    <Context.Provider value={ valuesContext }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
