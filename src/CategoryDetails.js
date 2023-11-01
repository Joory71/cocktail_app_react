import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CategoryDetails() {
  const { id } = useParams();
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // Vous devrez effectuer une nouvelle requête à l'API pour obtenir les cocktails de la catégorie spécifiée (id).
    // Remplacez l'URL de l'API et la requête en conséquence.
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => response.json())
      .then((data) => setCocktails(data.drinks))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <h2>Détails des cocktails de la catégorie {id}</h2>
      <ul>
        {cocktails.map((cocktail) => (
          <li key={cocktail.idDrink}>
            <h3><Link to={`/cocktail/${cocktail.idDrink}`}>{cocktail.strDrink}</Link></h3>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryDetails;
