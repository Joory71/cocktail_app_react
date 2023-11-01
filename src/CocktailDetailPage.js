import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IngredientImage from './IngredientImage';

function CocktailDetailPage() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    // Effectuez une requête pour obtenir les détails du cocktail en fonction de son ID (id).
    // Remplacez l'URL de l'API et la requête en conséquence.
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setCocktail(data.drinks[0]))
      .catch((error) => console.error(error));
  }, [id]);

  if (!cocktail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Détails du cocktail : {cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>Ingrédients nécessaires :</h3>
      <ul>
        {Object.keys(cocktail)
          .filter((key) => key.includes('strIngredient') && cocktail[key])
          .map((key, index) => (
            <li key={key}>
              <IngredientImage ingredient={cocktail[key]} /> - {cocktail[`strMeasure${key.slice(-1)}`]}
            </li>
          ))}
      </ul>
      <h3>Instructions :</h3>
      <p>{cocktail.strInstructions}</p>
    </div>
  );
}

export default CocktailDetailPage;
