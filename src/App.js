import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import CategoryDetails from './CategoryDetails';
import CocktailDetailPage from './CocktailDetailPage';
import NavigationMenu from './NavigationMenu';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>La beuvrie n'est jamais finie</h1>
        <NavigationMenu />
        <Switch>
          <Route exact path="/" component={CategoryList} />
          <Route path="/category/:id" component={CategoryDetails} />
          <Route path="/cocktail/:id" component={CocktailDetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
