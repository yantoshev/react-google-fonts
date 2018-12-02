import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: "AIzaSyDJ8Uu_4qKLim3Z1ohAOw2-uKge5FFsOV4",
      authDomain: "fonts-1e9c1.firebaseapp.com",
      databaseURL: "https://fonts-1e9c1.firebaseio.com",
      projectId: "fonts-1e9c1",
      storageBucket: "fonts-1e9c1.appspot.com",
      messagingSenderId: "869127537201"
    };

    if (!firebase.apps.length) firebase.initializeApp(config);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            name="home"
            path="/"
            render={props => <Home db={firebase} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
