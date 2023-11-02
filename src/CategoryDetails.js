import React, { useState, useEffect, useRef } from 'react';
import { useFavoris } from './FavorisContext';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import './Cocktail.css';

function CategoryDetails() {
  const { id } = useParams();
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cocktailsPerPage = 12;
  const searchInputRef = useRef(null); // Create a ref for the search input
  const { toggleFavori, isFavori } = useFavoris();

  useEffect(() => {
    // Fetch cocktails based on the category ID.
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleToggleFavori = (cocktailId) => {
    // Trouvez le cocktail dans la liste en fonction de son ID
    const cocktail = cocktails.find((item) => item.idDrink === cocktailId);

    if (cocktail) {
      toggleFavori(cocktail);
    }
  };

  const handleSearch = () => {
    const searchValue = searchInputRef.current.value;
    setSearchTerm(searchValue);

    // Fetch cocktails based on ingredients
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks);
      })
      .catch((error) => console.error(error));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Calculate the offset
  const offset = (currentPage - 1) * cocktailsPerPage;

  // Calculate the total number of pages
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  // Fonction pour calculer les indices des pages à afficher
  // Fonction pour calculer les indices des pages à afficher
  const getVisiblePageIndices = (currentPage, totalPages) => {
    const numVisiblePages = 3;
    if (totalPages <= numVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
  
    // Filtrer les pages invalides
    let visiblePages = [currentPage];
    let nextPage = currentPage + 1;
    let prevPage = currentPage - 1;
  
    while (visiblePages.length < numVisiblePages) {
      if (nextPage <= totalPages) {
        visiblePages.push(nextPage);
        nextPage++;
      }
      if (visiblePages.length < numVisiblePages && prevPage > 0) {
        visiblePages.unshift(prevPage);
        prevPage--;
      }
    }
  
    return visiblePages;
  };
  


  // Get visible cocktails for the current page
  const visibleCocktails = cocktails.slice(offset, offset + cocktailsPerPage);

  return (
    <Container>
      <h2>Cocktails in the category: {id}</h2>
      <Row>
        <Col className='col-10'>
          <input className='form-control'
            type="text"
            placeholder="Search by ingredients or name"
            ref={searchInputRef}
            onKeyPress={handleKeyPress}
          />
        </Col>
        <Col className='col-2'>
          <button className='btn btn-primary' onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </Col>
      </Row>
      <div className='pagination-wrapper'>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(1)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
              </button>
            </li>
            {getVisiblePageIndices(currentPage, totalPages).map((page) => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <button
                  className={`page-link page-number`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
              <FontAwesomeIcon icon={faAnglesRight} />
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Row>
        {visibleCocktails.map((cocktail) => (
          <Card className='col-lg-3 col-6 card-details' key={cocktail.idDrink}>
            <Col>
              <h3>{cocktail.strDrink}</h3>
              <Col className='col-12'><img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} /></Col>
              <Row className='wrapper-btn'>
                <Button className='btn-dark btn-details'>
                  <Link className='link' to={`/cocktail/${cocktail.idDrink}`}>View Details</Link>
                </Button>
              </Row>
              <Row className='wrapper-btn'>
                <Button className='btn-like' onClick={() => handleToggleFavori(cocktail.idDrink)}>
                  {isFavori(cocktail) ? (
                    <span>
                      <i className="fa fa-heart"></i>
                    </span>
                  ) : (
                    <span>
                      <i className="fa fa-heart-o"></i>
                    </span>
                  )}
                </Button>
              </Row>
            </Col>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryDetails;
