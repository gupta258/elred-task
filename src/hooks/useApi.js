import { useEffect, useState } from "react";
import axios from "axios";

const UseApi = (url) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.post(url);
        setUserData(response.data.result[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { userData, loading, error };
};

export default UseApi;
