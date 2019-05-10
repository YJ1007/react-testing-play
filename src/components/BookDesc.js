import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_KEY } from "../config/config.js";
import { GetRequest } from "../utils/network";

export default class BookDesc extends Component{
  constructor(props){
    super(props);
    this.state = {
      desc: "Fetching description ...",
      error: null,
    };
    this.bookData = this.props.bookData;
  }

  componentDidMount(){
    this.fetchDescription();
  }

  fetchDescription = () => {
    var bId = this.bookData.best_book.id;
    getBookDesc(bId, (res) => {
      if(res.status == 200){
        var parser = new DOMParser();
        var xml = parser.parseFromString(res.response, "application/xml");
        const parseError = xml.getElementsByTagName("parsererror");
        if (parseError.length) {
          this.setState({ error: "There was an error fetching results."});
        } else {
          var desc = xml.getElementsByTagName("description")[0].innerHTML;
          desc = desc.replace("<![CDATA[", "").replace("]]>", "");
          if (!desc) {
            desc = "No description found.";
          }
          this.setState({desc: desc});
        }
      }
      else this.setState({error: "unable to find description at the moment"});
    });
  }

  render(){
    return(
      <div>
        <button onClick={this.props.collapseBook}>Go Back</button>
        <h3>{this.bookData.best_book.title}</h3>
        <div>
          <img src={this.bookData.best_book.image_url} height="200px" width="130px" alt="book cover"/>
          <p>
            By:{" "}
            <span>{this.bookData.best_book.author.name}</span>
          </p>
          <p>Avg. Rating: {this.bookData.average_rating}</p>
        </div>
        <div>
          {
            this.state.error ? <p>{this.state.error}</p> : <p dangerouslySetInnerHTML={{ __html: this.state.desc }} />
          }
        </div>
        <div><a href={"https://www.goodreads.com/book/show/" + this.bookData.best_book.id}>Learn More</a></div>
      </div>
    );
  }
}

function getBookDesc(bookId, cb){
  GetRequest("https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/" + bookId + "?key=" + API_KEY, cb);
}

BookDesc.propTypes = {
  bookData: PropTypes.object,
  collapseBook: PropTypes.func
};
