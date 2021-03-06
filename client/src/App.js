import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.jpg";
import Games from "./components/Games";

const client = new ApolloClient({
  uri: process.env.API_URL + "/graphql"
});

class App extends Component {
  render() {
    console.log("process.env.API_URL", process.env.API_URL);
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="Halo Scoreboard"
              style={{ width: 100, display: "block" }}
            />
            <Route exact path="/" component={Games} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
