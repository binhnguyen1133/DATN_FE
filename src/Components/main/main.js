import React from "react";
import { Header, Footer, Home, SearchResult } from "../../Barrel/index.js";
import { BrowserRouter, Route } from "react-router-dom";

export class Main extends React.Component {
  render() {
    // console.log(window.location.pathname);
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/result-search/:id" component={SearchResult} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
