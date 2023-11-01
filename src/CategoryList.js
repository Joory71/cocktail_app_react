import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Effectuez une requête pour obtenir les catégories depuis l'API TheCocktailDB
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setCategories(data.drinks))
      .catch((error) => console.error(error));
  }, []); // Le tableau vide en tant que deuxième argument garantit que cette requête est effectuée une seule fois lors du montage du composant.

  return (
    <div>
      <h2>Les grandes catégories de cocktails</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.strCategory}>
            <Link to={`/category/${category.strCategory}`}>{category.strCategory}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
