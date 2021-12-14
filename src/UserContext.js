import React from "react";
import {
  GET_USER_REQUEST,
  handleRequest,
  TOKEN_REQUEST,
  TOKEN_VALIDATE_REQUEST,
} from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(() => {
    setData(null);
    setError(null);
    setLogin(false);
    setLoading(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        setError(null);
        setLoading(true);
        const { status } = await handleRequest(
          TOKEN_VALIDATE_REQUEST(token),
          null
        );

        if (status === 200) {
          await getUser(token);
        } else {
          userLogout();
          setError("Token inválido");
        }
        setLoading(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  const getUser = async (token) => {
    const { status, data } = await handleRequest(GET_USER_REQUEST(token), null);
    if (status === 200) {
      setData(data);
      setLogin(true);
    }
  };

  const userLogin = async (username, password) => {
    setError(null);
    setLoading(true);
    const response = await handleRequest(TOKEN_REQUEST, { username, password });

    if (response.status === 200) {
      const token = response.data.token;
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } else {
      console.log(response.data);
      setError(`Error: ${response.status}`);
      setLogin(false);
    }

    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
