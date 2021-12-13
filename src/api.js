import axios from "axios";

export const API_URL = "https://dogsapi.origamid.dev/json";

export const setRequestParams = (method, endPoint, body, headers) => {
  return {
    method,
    url: `${API_URL}${endPoint}`,
    data: body,
    headers,
  };
};

export const handleRequest = (properties) => {
  axios.request(properties).then((response) => {
    const { data } = response;
    console.log(data);
    return response;
  });
};
