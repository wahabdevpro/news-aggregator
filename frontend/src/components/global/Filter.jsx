import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "./Input"; // Custom Input Component
import Btn from "./Button"; // Custom Button Component
import DateRangePickerComponent from "./DateRangePicker"; // New DateRangePicker Component
import CheckboxGroup from "./CheckBoxGroup";
import { useDispatch, useSelector } from "react-redux";
import NewsService from "../../services/NewsService";
import { setSiteData } from "../../redux/slices/siteDataSlice";
import { setFilterData } from "../../redux/slices/filterSlice";
import useSiteData from "../../customHooks/useSiteData";
import { Helper } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import localRoutes from "../../utils/localRoutes";
import LoadingComponent from "./Loading";
import { closeModal } from "../../redux/slices/modalSlice";
import SubHeading from "./SubHeading";

/**
 * FilterComponent for filtering news by keyword, categories, sources, and date.
 *
 * @component
 */
const FilterComponent = () => {

  const { isAuthenticated: isLoggedIn } = useSelector((state) => state.auth);
  const { categories: categories_redux, sources: sources_redux, dateRange: date_rage_redux, keyword: keyword_redux } = useSelector((state) => state.filter);

  const [keyword, setKeyword] = useState(keyword_redux);
  const [selectedCategories, setSelectedCategories] = useState(categories_redux);
  const [selectedSources, setSelectedSources] = useState(sources_redux);
  const [dateRange, setDateRange] = useState(date_rage_redux);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Use the custom hook to get site data
  const { categories, sources, loading, error } = useSiteData();


  // Handles the selection of the categories and updates the state
  const handleChange = Helper.handleCheckBoxChangeArray


  // Handle filter submission
  const handleSubmit = () => {

    const filters = {
      keyword,
      categories: selectedCategories,
      sources: selectedSources,
      dateRange,
    };

    // Update the filter data on the redux store
    dispatch(setFilterData(filters));

    // Close the modal
    dispatch(closeModal());

    // Navigate to the search page
    navigate(localRoutes.search);

  };

  // If the site data is not loaded, show loading message
  if (error) {

    return <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>;

  } else if (loading) {

    return <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingComponent />
    </Box>
  }


  return (
    <Box sx={{ p: 4 }}>
      {/* Keyword Search */}
      <Typography variant="h6" gutterBottom>
        Search by Keyword
      </Typography>
      <Input
        label="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ mb: 3 }}
        size="small"
      />

      {/* Categories and Sources */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SubHeading text="Categories" />
          <CheckboxGroup
            items={categories}
            selectedItems={selectedCategories}
            onItemChange={(id) => handleChange(id, setSelectedCategories)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SubHeading text="Sources" />
          <CheckboxGroup
            items={sources}
            selectedItems={selectedSources}
            onItemChange={(id) => handleChange(id, setSelectedSources)}
          />
        </Grid>
      </Grid>

      {/* Date Range Picker (Reused) */}
      <Box display="div" mt={4}>
        <DateRangePickerComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </Box>

      {/* Submit Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Btn
          text="Search News"
          onClick={handleSubmit}
          fullWidth={false}
          sx={{ minWidth: 150 }}
        />
      </Box>
    </Box>
  );
};


export default FilterComponent;
