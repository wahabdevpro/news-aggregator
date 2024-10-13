import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import useSiteData from "../../../customHooks/useSiteData";

/**
 * A reusable tab component for displaying categories in the navbar.
 *
 * This component takes a list of category objects and renders them as tabs.
 * When a tab is selected, it invokes the provided callback function with the
 * selected category object.
 *
 * @param {Object} props - Component props.
 * @param {function(Category): void} props.onCategorySelect - Callback function invoked when a category is selected.
 * @param {Object} props.sx - Custom styles for the component.
 * @returns {JSX.Element} - The CategoryNavbar component.
 */
const CategoryNavbar = ({ onCategorySelect, sx = {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use the custom hook to get site data
  const { categories: _categories, loading, error } = useSiteData();

  // Add the all category to the list of categories
  const categories = { all: "All", ..._categories };

  // Categories keys and sort by the according to the category key
  const categoriesKeys = Object.keys(categories).sort((a, b) => a.localeCompare(b));


  /**
   * Handles changes to the selected tab index.
   *
   * @param {Object} _event - Synthetic event object (not used).
   * @param {number} newIndex - The new index of the selected tab.
   */
  const handleChange = (_event, newIndex) => {
    setSelectedIndex(newIndex);
    onCategorySelect(categoriesKeys[newIndex]);
  };


  return (
    <Box
      sx={{
        // Styling for the tab bar
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "white",
        ...sx
      }}
    >

      {
        // Show a loading indicator if the data is still loading and there is no error
        loading && <Box sx={{ display: "flex", justifyContent: "center" }}>Loading categories...</Box>
      }

      {
        // Show an error message if there was an error fetching the data
        error && <Box sx={{ display: "flex", justifyContent: "center" }}>Error fetching data</Box>
      }

      {
        !loading && !error && categories && categoriesKeys.length > 0 && (
          <Tabs
            value={selectedIndex}
            // Update the selected tab index when the user changes the tab
            onChange={handleChange}
            // Render the tabs in a scrollable container
            variant="scrollable"
            // Show auto-scrolling buttons when there are more tabs than can fit
            scrollButtons="auto"
            // Accessibility label for the tabs
            aria-label="category tabs"
          >
            
            {categoriesKeys.map((id) => (
              // Render each category as a tab
              <Tab key={id} label={categories[id]} />
            ))}
          </Tabs>
        )
      }


    </Box>
  );
};

// PropTypes for CategoryNavbar to ensure type safety and enforce required props
CategoryNavbar.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  sx: PropTypes.object
};

export default CategoryNavbar;
