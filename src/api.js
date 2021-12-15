import axios from "axios";

export const API_URL = "https://dogsapi.origamid.dev/json";

export const setRequestParams = (method, endPoint, headers) => {
  return {
    method,
    url: `${API_URL}${endPoint}`,
    headers,
  };
};

export const handleRequest = async (properties, data) => {
  const response = await axios
    .request({ ...properties, data })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const TOKEN_REQUEST = setRequestParams("POST", "/jwt-auth/v1/token", {
  "Content-Type": "Application/json",
});

export const TOKEN_VALIDATE_REQUEST = (token) =>
  setRequestParams("POST", "/jwt-auth/v1/token/validate", {
    Authorization: `Bearer ${token}`,
  });

export const GET_USER_REQUEST = (token) =>
  setRequestParams("GET", "/api/user", {
    Authorization: `Bearer ${token}`,
  });

export const CREATE_USER_REQUEST = () =>
  setRequestParams("POST", "/api/user", {
    "Content-Type": "Application/json",
  });
