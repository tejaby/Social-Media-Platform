// libraries
import toast from "react-hot-toast";

// context
import { UserContext } from "../../context/User";

// utils
import { getFollowErrorMessage } from "../../utils/getErrorMessage";

// react
import { useEffect, useState, useContext } from "react";

function useFetchFollowData(service, user, token) {
  const { loading: cargando } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service(user, token);
        setData(response);
      } catch (err) {
        const error = getFollowErrorMessage(err, "get");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user && token && !cargando) {
      fetchData();
    }
  }, [user, token, cargando]);

  return { data, loading };
}

export default useFetchFollowData;
