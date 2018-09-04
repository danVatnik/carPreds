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

    this.setResults = this.setResults.bind(this);
  }

  setResults(cars){
    this.setState({cars: cars});
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-3">
            <SearchBar setResults={this.setResults}/>
          </div>
          <div className="col-9">
            <Results cars={this.state.cars}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
