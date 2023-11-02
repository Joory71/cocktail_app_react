// FavorisContext.js
import React, { createContext, useContext, useState } from 'react';

const FavorisContext = createContext();

export const useFavoris = () => {
  return useContext(FavorisContext);
};

export const FavorisProvider = ({ children }) => {
  const [favoris, setFavoris] = useState([]);

  const toggleFavori = (cocktail) => {
    if (isFavori(cocktail)) {
      removeFavori(cocktail.idDrink); // Utilisez removeFavori avec l'ID du cocktail
    } else {
      addFavori(cocktail);
    }
  };

  const addFavori = (cocktail) => {
    setFavoris([...favoris, cocktail]);
  };

  const removeFavori = (cocktailId) => {
    const updatedFavoris = favoris.filter((item) => item.idDrink !== cocktailId);
    setFavoris(updatedFavoris);
  };

  const isFavori = (cocktail) => {
    return favoris.some((item) => item.idDrink === cocktail.idDrink);
  };

  return (
    <FavorisContext.Provider value={{ favoris, toggleFavori, removeFavori, isFavori }}>
      {children}
    </FavorisContext.Provider>
  );
};
