import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

function Routes() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return setIsLogged(true);
  }, [isLogged]);
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login setIsLogged={setIsLogged} isLogged={isLogged} />
      </Route>
      <Route path="/dashboard">
        <Dashboard isLogged={isLogged} setIsLogged={setIsLogged} />
      </Route>
    </Switch>
  );
}

export default Routes;
