import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import SearchBar from './components/search-bar';
import Results from './components/results';

class App extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }


  render() {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-3">
            <SearchBar />
          </div>
          <div className="col-9">
            <Results />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
