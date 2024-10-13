import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Btn from "../components/global/Button";
import CheckboxGroup from "../components/global/CheckBoxGroup";
import usePreferences from "../customHooks/usePreferences";
import { Helper } from "../utils/helper";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/slices/alertSlice";
import UserService from "../services/UserService";
import { setPreferences } from "../redux/slices/preferencesSlice";
import LoadingComponent from "../components/global/Loading";
import PageWrapper from "../components/pages/page";
import SubHeading from "../components/global/SubHeading";

/**
 * Preferences component to allow users to select their preferred categories and sources.
 * The component handles user input and saves selected preferences.
 *
 * The data includes mock categories, sources, and user preferences.
 *
 * @component
 * @returns {JSX.Element} The Preferences component.
 */
const Preferences = () => {

  const { siteData, preferences, error, loading } = usePreferences();
  const [submitting, setSubmitting] = useState(false);

  // State to track selected categories and sources
  const [selectedCategories, setSelectedCategories] = useState(preferences.categories);
  const [selectedSources, setSelectedSources] = useState(preferences.sources);

  const dispatch = useDispatch();


  // On loading state change set the selected categories and sources
  useEffect(() => {

    // Preference data changes
    setSelectedCategories(preferences.categories);
    setSelectedSources(preferences.sources);

  }, [loading]);


  // Hanles the selection of the categories and updates the state
  const handleChange = Helper.handleCheckBoxChangeArray



  const afterSubmit = (isSuccess, data) => {

    setSubmitting(false);

    if (!isSuccess) {
      dispatch(showAlert({ message: data, severity: "error" }));
    } else {
      dispatch(showAlert({ message: data, severity: "success" }));
    }

  }

  /**
   * Handle the form submission to save preferences.
   */
  const handleSubmit = async () => {

    setSubmitting(true);

    const preferences = {
      categories: selectedCategories,
      sources: selectedSources,
    };

    try {

      // Call the api to save the preferences
      const response = await UserService.setPreferences(preferences);

      // If not success then alert the error
      if (!response.success) {
        return afterSubmit(false, response.data);
      }


      // We are here it means success so update the redux
      dispatch(setPreferences({
        categories: selectedCategories,
        sources: selectedSources
      }))


      // If success then alert the success message
      return afterSubmit(true, response.data);

    } catch (error) {
      return afterSubmit(false, error);
    }


  };



  return (
    <PageWrapper>

      <Box sx={{ mt: 4 }}>

        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Choose Your Preferences
          </Typography>
          <Typography mb={3} variant="body1" align="center" gutterBottom>
            Select your preferred categories and sources to personalize your news feed.
          </Typography>

          {
            error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>
          }

          {
            loading && <LoadingComponent />
          }

          {
            !loading && !error && (

              <>
                <Grid container spacing={3}>

                  <Grid item xs={12} sm={6}>
                    <SubHeading text="Categories" />
                    <CheckboxGroup
                      key={"categories"}
                      items={siteData.categories}
                      selectedItems={selectedCategories}
                      onItemChange={(id) => handleChange(id, setSelectedCategories)}
                    />
                  </Grid>


                  <Grid item xs={12} sm={6}>
                  <SubHeading text="Sources" />

                    <CheckboxGroup
                      key={"sources"}
                      items={siteData.sources}
                      selectedItems={selectedSources}
                      onItemChange={(id) => handleChange(id, setSelectedSources)}
                    />
                  </Grid>
                </Grid>


                <Box display="flex" justifyContent="center" mt={4}>
                  <Btn
                    isLoading={submitting}
                    text="Save Preferences"
                    onClick={handleSubmit}
                    key={"btn"}
                    fullWidth={false}
                    sx={{ minWidth: 150 }}
                  />
                </Box>

              </>

            )
          }


        </Paper>

      </Box>

    </PageWrapper >
  );
};

export default Preferences;
