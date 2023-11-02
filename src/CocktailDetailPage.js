import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IngredientImage from './IngredientImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import './Cocktail.css';
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
    <Container>
      <Row>
        <h2>Détails du cocktail : {cocktail.strDrink}</h2>
        <Col className='col-lg-4 col-12 wrapper-img'><img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} /></Col>
        <Col className='col-lg-8 col-12 wrapper-ingredients'>
          <h3>Ingrédients nécessaires :</h3>
          <Row>
            {Object.keys(cocktail)
              .filter((key) => key.includes('strIngredient') && cocktail[key])
              .map((key, index) => (
                <div className='col-lg-4 col-6' key={key}>
                  <div className='ingredient center'><IngredientImage ingredient={cocktail[key]} /><Badge bg='secondary'>{cocktail[`strMeasure${key.slice(-1)}`]}</Badge></div>
                </div>
              ))}
          </Row>
          <h3>Instructions :</h3>
          <p className='description'>{cocktail.strInstructions}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default CocktailDetailPage;
