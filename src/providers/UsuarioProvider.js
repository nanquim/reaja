//Context API para manter usuário logado
import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";

export const UsuarioContext = createContext({ usuario: null });

function UsuarioProvider({ children }) {

    const [usuario, setUsuario] = useState(firebase.getCurrentUser() || null);
    const [loadingAutenticacao, setLoadingAutenticacao ] = useState(false);
    
    useEffect(() => {
       firebase.getAuth().onAuthStateChanged((res) => {
        setUsuario(res);
        setLoadingAutenticacao(true);
      }); 
  }, []);

  return (
    <UsuarioContext.Provider value={{
      usuario,
      autenticado: usuario !== null,
      setUsuario,
      loadingAutenticacao
    }}>
      {children}
    </UsuarioContext.Provider>
  );
}
export default UsuarioProvider;
