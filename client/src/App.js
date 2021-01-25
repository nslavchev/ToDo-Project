import React from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from  "./Home";
import Edit from "./Edit";
import CreateTodo from "./createTodo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <div>
        <Router>
          <Switch>
            <Route exact path={"/"}>
              <SignIn/>
            </Route>
            <Route path={"/signup"}>
              <SignUp/>
            </Route>
            <Route path={"/home"}>
              <Home/>
            </Route>
            <Route path={"/createTodo"}>
              <CreateTodo/>
            </Route>
            <Route path={"/Edit"}>
              <Edit/>
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;