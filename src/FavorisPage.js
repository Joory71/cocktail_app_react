import React from 'react';
import { useFavoris } from './FavorisContext';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Cocktail.css';

function FavorisPage() {
  const { favoris, removeFavori } = useFavoris();

  const handleRemoveFavori = (cocktailId) => {
    removeFavori(cocktailId);
  };

  return (
    <Container>
      <h2>Vos cocktails favoris :</h2>
      <Row>
        {favoris.map((cocktail) => (
          <Card className='col-lg-3 col-6 card-details' key={cocktail.idDrink}>
            <div>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <Row className='center'>{cocktail.strDrink}</Row>
              <Row className='wrapper-btn'>
                <Button className='btn-dark btn-details'>
                  <Link className='link' to={`/cocktail/${cocktail.idDrink}`}>View Details</Link>
                </Button>
                <Button
                  className='btn-danger btn-details close'
                  onClick={() => handleRemoveFavori(cocktail.idDrink)}
                >
                  <FontAwesomeIcon icon={faTimes} /> {/* Utilisez l'icône de croix */}
                </Button>
              </Row>
            </div>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default FavorisPage;
