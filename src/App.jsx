import React, { Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";

import GlobalStyle from "./UI/GlobalStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUserName } from "./features/userSlice";
function App() {
  const userName = useSelector(selectUserName);
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          {userName && (
            <Fragment>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/detail/:id">
                <Detail />
              </Route>
            </Fragment>
          )}
          <Route path="/login">
            <Login />
          </Route>
          {!userName && <Redirect from="*" to="/login" />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
