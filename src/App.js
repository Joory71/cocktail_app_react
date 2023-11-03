import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FavorisProvider } from './FavorisContext';
import CategoryList from './CategoryList';
import CategoryDetails from './CategoryDetails';
import CocktailDetailPage from './CocktailDetailPage';
import NavigationMenu from './NavigationMenu';
import FavorisPage from './FavorisPage';
import './Cocktail.css';
function App() {
  return (
    <Router>
      <FavorisProvider>
      <div className="App">
      <NavigationMenu />
        <h1>CocktailWizard</h1>
        <Switch>
          <Route exact path="/" component={CategoryList} />
          <Route path="/category/:id" component={CategoryDetails} />
          <Route path="/cocktail/:id" component={CocktailDetailPage} />
          <Route path="/favoris" component={FavorisPage} />
        </Switch>
      </div>
      </FavorisProvider>
    </Router>
  );
}

export default App;
