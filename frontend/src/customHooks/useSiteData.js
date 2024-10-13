import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSiteData } from "../redux/slices/siteDataSlice";
import NewsService from "../services/NewsService";
/**
 * Custom hook to fetch and manage site data (categories, sources, etc. and store it on the redux).
 *
 */
const useSiteData = () => {
  const { categories, sources, isSet } = useSelector((state) => state.siteData); // Accessing Redux state
  const [loading, setLoading] = useState(!isSet);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Load the site data if it's not already loaded
  useEffect(() => {
    if (!isSet) {
      setLoading(true);
      NewsService.getSiteData()
        .then((response) => {
          // If not success
          if (!response.success) {
            setError(response.data);
            return;
          }

          // Set the data to redux store
          const data = response.data;
          dispatch(setSiteData(data));
        })
        .catch((e) => {
          setError("Failed to fetch site data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isSet, dispatch]);

  // Return the necessary data, loading status, and error
  return {
    categories,
    sources,
    loading,
    error,
  };
};

export default useSiteData;
