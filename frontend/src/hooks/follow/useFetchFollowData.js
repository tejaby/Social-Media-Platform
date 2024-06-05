// context
import { UserContext } from "../../context/User";

// react
import { useEffect, useState, useContext } from "react";

function useFetchFollowData(service, token) {
  const { loading: cargando } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service(token.access);
        setData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token && !cargando) {
      fetchData();
    }
  }, [token, cargando]);

  return { data, loading };
}

export default useFetchFollowData;
