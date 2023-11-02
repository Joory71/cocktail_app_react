import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons'; // Import the "home" icon
import './Navigation.css';

function NavigationMenu() {
  return (
    <nav className='navbar'>
      <ul className='menu-list'>
        <li className='menu-item'>
          <Link to="/" className='menu-link'>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>
        <li className='menu-item'>
          <Link to="/favoris" className='menu-link'>
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </nav>
  );

}

export default NavigationMenu;
