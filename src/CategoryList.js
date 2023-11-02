import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import './Cocktail.css';
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
    <Container>
      <h2>Les grandes catégories de cocktails</h2>
      <Row className='center'>
        {categories.map((category) => (
          <Card className='col-lg-3 col-12 card-home'>
            <Col className='center' key={category.strCategory}>
              <Link to={`/category/${encodeURIComponent(category.strCategory)}`}>{category.strCategory}</Link>
            </Col>
          </Card>
        ))}
      </Row>
    </Container>
  );
  
}

export default CategoryList;
