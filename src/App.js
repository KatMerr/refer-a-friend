import React, { Suspense, lazy} from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./components/pages/home'));
const AddProduct = lazy(() => import('./components/pages/add-product'));

function App(){
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>

        <Link to="/">Home</Link>
        <Link to="/add-product">AddProduct</Link>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add-product" component={AddProduct} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
