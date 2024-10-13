import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSiteData } from "../redux/slices/siteDataSlice";
import { setPreferences } from "../redux/slices/preferencesSlice";
import UserService from "../services/UserService";

/**
 * Custom hook to fetch fetch the preferences and the site data (categories, sources, etc. and store it on the redux).
 *
 */
const usePreferences = () => {
  const { categories, sources, isSet } = useSelector((state) => state.siteData); // Accessing Redux state
  const { categories: prefCategories, sources: prefSources, isSet: prefIsSet } = useSelector((state) => state.preferences);
  const [loading, setLoading] = useState(!isSet);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Load the preferences if it's not already loaded
  useEffect(() => {
    if (!prefIsSet) {
      setLoading(true);
      UserService.getPreferences()
        .then((response) => {

          // If not success
          if (!response.success) {
            setError(response.data);
            return;
          }

          // Set the data to redux store
          const data = response.data;

          // Dispatch the preferences
          dispatch(setPreferences(data.userPreferences));

          // Dispatch the site data
          dispatch(setSiteData({
            categories: data.categories,
            sources: data.sources,
          }));

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
    siteData: {
      categories,
      sources,
    },
    preferences: {
      categories: prefCategories,
      sources: prefSources,
    },
    loading,
    error,
  };
};

export default usePreferences;
