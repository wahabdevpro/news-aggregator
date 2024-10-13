import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import CategoryNavbar from "../components/pages/feed/CategoryNavbar";
import NewsCard from "../components/global/NewsCard";
import NewsFeed from "../components/pages/feed/NewsFeed";
import NewsService from "../services/NewsService";
import PageWrapper from "../components/pages/page";
import { useSelector } from "react-redux";

/**
 * FeedPage component that displays a grid of news with pagination.
 *
 * This component displays a grid of news based on the current page and
 * allows the user to navigate between pages using the pagination component.
 *
 * @component
 */
const SearchNews = () => {

  const { categories, sources, dateRange, keyword } = useSelector((state) => state.filter);

  // Ready the filter
  const filter = {
    categories: categories,
    sources: sources,
    dateFrom: dateRange[0] || "",
    dateTo: dateRange[1] || "",
    q: keyword
  };


  return (
    <PageWrapper key={"page_wrapper"}>

      <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>Search News</Typography>

      {/* News Feed */}
      <NewsFeed key={"news_feed"} serviceFn={NewsService.getNewsWithFilters} filter={filter} />

    </PageWrapper>
  );
};

export default SearchNews;
