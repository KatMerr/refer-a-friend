import React, { Suspense, lazy} from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Navigation from './components/organisms/navigation'
import { Colors, Fonts } from './utils/style-globals'
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./components/pages/home'));
const AddReferal = lazy(() => import('./components/pages/add-referal'));
const AddProduct = lazy(() => import('./components/pages/add-product'));

const Content = styled.div`
  max-width: 1000px;
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

function App(){
  return (
    <AppWrapper>
      <Router>
        <Navigation></Navigation>
        <Suspense fallback={<div>Loading</div>}>
            <Content>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/add-referal" component={AddReferal} />
                  <Route path="/add-product" component={AddProduct} />
                </Switch>
            </Content>
        </Suspense>
      </Router>
    </AppWrapper>
  );
};

export default App;
