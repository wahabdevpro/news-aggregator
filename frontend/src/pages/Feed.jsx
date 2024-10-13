import { Box, Container } from "@mui/material";
import { useState } from "react";
import CategoryNavbar from "../components/pages/feed/CategoryNavbar";
import NewsCard from "../components/global/NewsCard";
import NewsFeed from "../components/pages/feed/NewsFeed";
import NewsService from "../services/NewsService";
import PageWrapper from "../components/pages/page";

/**
 * FeedPage component that displays a grid of news with pagination.
 *
 * This component displays a grid of news based on the current page and
 * allows the user to navigate between pages using the pagination component.
 *
 * @component
 */
const FeedPage = () => {

  const [selectedCategory, setSelectedCategory] = useState("all");


  // Handle category selection
  /**
   * Handles the selection of a category by logging the selected category
   * to the console.
   *
   * @param {Object} category - The selected category object.
   */
  const handleCategorySelect = (category) => {

    // Set the selected category
    setSelectedCategory(category);

  };


  // Ready the filter, if the selected categories is all then no filter is needed else filter the selected category
  const filter = selectedCategory && selectedCategory !== "all" ? {
    categories: [selectedCategory]
  } : {};


  return (
    <PageWrapper key={"page_wrapper"}>

      <Box key={"inner"}>

        {/* Category Navbar */}
        <Box key={"category-navbar-box"} sx={{ width: "100%", mt: 4 }}>
          <CategoryNavbar key={"category-navbar"}
            onCategorySelect={handleCategorySelect}
          />
        </Box>

        {/* News Feed, we are setting the key to category, so whenever the selected category changes then it will change remount the component which will fetch that categories news */}
        <NewsFeed key={selectedCategory} serviceFn={NewsService.getNewsWithFilters} filter={filter} />

      </Box>

    </PageWrapper>

  );
};

export default FeedPage;
