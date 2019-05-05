import React, { Suspense, lazy } from 'react';
import styled from 'styled-components'
import Navigation from './components/organisms/navigation'
import { Colors, Fonts, Breakpoints } from './utils/style-globals'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/atoms/protected-route';

import { primaryNavigation, dashboardNavigation } from './utils/consts'

import Logout from './components/pages/logout'
const HomePage = lazy(() => import('./components/pages/home'));
const AddReferal = lazy(() => import('./components/pages/add-referal'));
const AddProduct = lazy(() => import('./components/pages/add-product'));
const Login = lazy(() => import('./components/pages/login'));
const PendingProducts = lazy(() => import('./components/pages/pending-products'));
const AddProductConfirmation = lazy(() => import('./components/pages/add-product-confirmation'));
const AddReferalConfirmation = lazy(() => import('./components/pages/add-referal-confirmation'));

const Content = styled.div`
  max-width: ${Breakpoints.max};
  margin: 0 auto;
  font-size: ${Fonts.sizes.normal};
`;

const AppWrapper = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: ${Colors.mint};
  color: ${Colors.black};
  font-family: ${Fonts.types.lora};
  font-size: ${Fonts.sizes.normal};
`;

//Lets make the app based in CSS Grid 
//Needs a 404
//Need the navigation to flex depending on it the user is logged in or not

function App(){
  return (
    <AppWrapper>
      <Router>
        <Navigation links={(false) ? dashboardNavigation : primaryNavigation} />
        <Suspense fallback={<div>Loading</div>}>
            <Content>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/add-referal" component={AddReferal} />
                  <Route path="/add-product" component={AddProduct} />
                  <Route path="/login" component={Login} />
                  <Route path="/add-product-confirmation" component={AddProductConfirmation} />
                  <Route path="/add-referal-confirmation" component={AddReferalConfirmation} />
                  <ProtectedRoute path="/logout" component={Logout} fallback="/login" />
                  <ProtectedRoute path="/pending-products" component={PendingProducts} fallback="/login" />
                  <ProtectedRoute path="/pending-referals" component={AddReferal} fallback="/login" />
                  <Route component={HomePage} />
                </Switch>
            </Content>
        </Suspense>
      </Router>
    </AppWrapper>
  );
};

export default App;
