import React from 'react';

function IngredientImage({ ingredient }) {
  return (
    <img
      src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
      alt={ingredient}
    />
  );
}

export default IngredientImage;
