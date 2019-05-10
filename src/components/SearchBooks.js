import React, { Component } from "react";
import { API_KEY } from "../config/config.js";
import PropTypes from "prop-types";
import { GetRequest } from "../utils/network";
import ShowResults from "./ShowResult";

export default class SearchBooks extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      error: "",
      loading: false,
      results: this.props.results,
    };
    this.results = [];
  }

  onTextChange = (e) => {
    this.setState({ searchText: e.target.value});
  };

  onButtonClick = () => {
    this.setState({loading: true});
    getSearchResult(this.state.searchText, (res) => {
      if(res.status == 200){
        var data = res.response;
        this.parseXMLToDomDoc(data);
      }
      else{
        this.setState({error: "unable to find books at the moment", loading: false});
      }
    });
  };

  parseXMLToDomDoc = (data) => {
    var parser = new DOMParser();
    var domDoc = parser.parseFromString(data, "application/xml");
    var parseError = domDoc.getElementsByTagName("parsererror");

    if(parseError.length) this.setState({ error: "error fetching results", loading: false});
    else{
      var workTagArr = new Array(...domDoc.getElementsByTagName("work"));
      var bookResults = workTagArr.map((el) => {
         return this.XMLToJson(el);
      });
      this.props.setResults(bookResults);
      this.setState({ loading: false, error: "", results: bookResults });
    }
  };

  XMLToJson = (xml) => {
    const allEnds = new Array(...xml.children);
    const jsonResult = {};
    allEnds.forEach((node) => {
      if(node.children && node.children.length) jsonResult[node.nodeName] = this.XMLToJson(node);
      else jsonResult[node.nodeName] = node.textContent;
    });
    return jsonResult;
  };

  displaySearchResult(){
    if(this.state.error.length) return <p>{this.state.error}</p>
    else{
      return(
        this.state.results.map((book) => {
          return <ShowResults bookData={book} key={book.id} expandBook={this.props.expandBook} />
        })
      )
    }
  }

  render(){
    return(
      <div>
        <div>
          <input type="text" placeholder="Search Books By title or author" name="searchText" onChange={this.onTextChange} value={this.state.searchText}/>
          <button onClick={this.onButtonClick} disabled={this.state.loading}> Search </button>
        </div>
        { this.state.loading ? <p>loading results...</p> : <p/>}
        {this.displaySearchResult()}
      </div>
    );
  }
}

function getSearchResult(searchText, cb){
  GetRequest("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=" + API_KEY + "&q=" + searchText, cb);
}

SearchBooks.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
  expandBook: PropTypes.func
};
