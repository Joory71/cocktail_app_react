import React from 'react';
import { Link } from 'react-router-dom';

function NavigationMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
