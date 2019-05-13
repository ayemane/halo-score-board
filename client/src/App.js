import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.jpg";
import Games from "./components/Games";

const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="Halo Scoreboard"
              style={{ width: 200, display: "block", margin: "auto" }}
            />
            <Route exact path="/" component={Games} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
