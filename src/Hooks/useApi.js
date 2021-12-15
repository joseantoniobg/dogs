import React from "react";
import axios from "axios";

const useApi = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRequest = React.useCallback(async (properties, data) => {
    setError(null);
    setLoading(true);
    const response = await axios
      .request({ ...properties, data })
      .catch((error) => {
        setData(null);
        setError(error.response.data.message);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
    setData(response);
  }, []);

  return { data, error, loading, handleRequest };
};

export default useApi;
