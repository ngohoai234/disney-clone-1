import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import GlobalStyle from "./UI/GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Error from "./components/Error";

import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
