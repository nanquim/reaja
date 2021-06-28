import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Login from "./components/Auth/login";
import Registro from "./components/Auth/registro";
import Conta from "./components/Conta";
import Salvos from "./components/Salvos";
import Loader from "./components/Loader";
import ProtectedRoute from "./ProtectedRoute";
import firebase from "./firebase";
import UsuarioProvider from './providers/UsuarioProvider'

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  }, [query]);

  const change = (val) => {
    setQuery(val);
  };

  return firebaseInitialized !== false ? (
    <UsuarioProvider>
      <Router>
        <Header query={query} change={change} />
        <main>
          <Switch>
            <Route path="/" exact component={() => <Feed query={query} />} />
            <Route path="/login" exact component={Login} />
            <Route path="/registro" exact component={Registro} />
            <ProtectedRoute path="/conta" exact component={Conta} />
            <ProtectedRoute path="/salvos" exact component={Salvos} />
          </Switch>
        </main>
      </Router>
    </UsuarioProvider>
  ) : (
    <Loader />
  );
}

export default App;
