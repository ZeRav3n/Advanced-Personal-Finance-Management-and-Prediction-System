import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Dashboard from './sections/Dashboard';
import Expenses from './sections/Expenses';
import Income from './sections/Income';
import Investments from './sections/Investments';
import Savings from './sections/Savings';
import Predictions from './sections/Predictions';
import Social from './sections/Social';
import Gamification from './sections/Gamification';


function App(){
  return(
    <Router>
      <Header />
      <MainContent>
        <Switch>
        <Route path="/" exact component={Dashboard} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/income" component={Income} />
          <Route path="/investments" component={Investments} />
          <Route path="/savings" component={Savings} />
          <Route path="/predictions" component={Predictions} />
          <Route path="/social" component={Social} />
          <Route path="/gamification" component={Gamification} />
        </Switch>
      </MainContent>
      <Footer />
    </Router>
  );
}

export default App;