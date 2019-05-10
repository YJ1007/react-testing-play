import React, { Component } from "react";
import SearchBooks from "./components/SearchBooks";
import BookDesc from "./components/BookDesc";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      expandedBook: null
    };
  }

  setResults = (results) => { this.setState({results: results }) };

  closeDesc = () => { this.setState({ expandedBook: null}) };

  openBook = (expandedBook) => { this.setState({expandedBook: expandedBook }) };

  getContent(){
    if(!this.state.expandedBook) return <SearchBooks results={this.state.results} setResults={this.setResults} expandBook={this.openBook}/>
    else return <BookDesc bookData={this.state.expandedBook} collapseBook={this.closeDesc}/>
  }

  render() {
    return (
      <div>
        <h3>Custom book search</h3>
        <div>
          {this.getContent()}
        </div>
      </div>
    );
  }
}
