import { Box, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import NewsCard from "../../global/NewsCard";
import ScrollPaginationDetector from "../../global/ScrollPaginationDetector";
import LoadingComponent from "../../global/Loading";


/**
 * News feed component that displays a grid of news with pagination.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {function} props.serviceFn - The service function to get the data
 * @param {Object.<string, string>} props.filter - The filter to pass to the service function
 */
const NewsFeed = ({ serviceFn, filter }) => {

  filter = filter || {}; // If filter is not provided then set it to empty object

  // State for pagination
  const [reload, setReload] = useState(false); // Reload state
  const _page = useRef(1); // Page state
  const page = _page.current;
  const _otherData = useRef({ sourceData: [] }); // Other data for news, pagination, sourceData
  const otherData = _otherData.current;
  const [news, setNews] = useState([]); // news state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const previousFilterRef = useRef(null);

 
  // Function to set the other data
  const setOtherData = (data) => {
    _otherData.current = data;
  }


  // Function to set the page
  const setPage = (pageNo, reload = false) => {

      _page.current = pageNo;
      if (reload) setReload((prev)=> {
        return !prev
      });

  }


  // Helper function
  const afterLoad = (isSuccess, data = null) => {

    setLoading(false);

    if (!isSuccess) setError(data);

  }


  // Memoize the filter to prevent unnecessary re-renders
  const memoizedFilter = JSON.stringify(filter);


  // useEffect to handle both filter and page changes
  useEffect(() => {
    
    // Reset news and set page to 1 when the filter changes
    if (memoizedFilter !== previousFilterRef.current) {

      // Set the previous filter
      previousFilterRef.current = memoizedFilter;

      setNews(() => []);

      // If it's not null then it means it's means it is not the first time mount called
      setPage(1, true);
      setOtherData({ sourceData: [] });

      return; // Wait for the page to reset to 1 before loading data

    }

    // Load data whenever the reload changes
    loadData();

  }, [reload, memoizedFilter]);


  // Function to load the data
  const loadData = async () => {

    setLoading(true);
    setError(null);

    // Combine the params
    const combinedFilter = { ...filter, sourceData: otherData.sourceData };

    const response = await serviceFn(page, combinedFilter);

    // If not success then alert the error
    if (!response.success) {
      return afterLoad(false, response.data);
    }

    // Set the other data if it's first page as the first page contains the pagination and source data which we can use for the next pages
    if (page === 1) setOtherData({
      pagination: response.data.pagination,
      sourceData: response.data.sourceData
    });

    // Append the news
    setNews([...news, ...response.data.news]);

    afterLoad(true);

  };


  // Handle pagination
  const onPagination = () => {

     // If it's already loading then return
     if (loading) return;

    // If there is an error then reload the current page after x seconds to keep the user experience smooth to show the error
    if (error) {

      // Set the loading to true
      setLoading(true);

      setTimeout(() => {

       setReload((prev) => !prev);

      }, 3000);

      return;

    }

    // if we have the next page then load it
    if (otherData.pagination?.totalPages > page) {

      setPage(page + 1, true);

    }

  }

  return (

    <Box sx={{ maxWidth: "100%", margin: "auto auto" }}>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>

        <Box>

          {/* Main News Section */}
          {
            news.length > 0 ? (
              news.map((news, index) => (

                <NewsCard key={index} news={news} />
    
              ))
            ) : !loading && (<Typography sx={{ textAlign: "center" }} variant="h6">No news found</Typography>)
          }

          {/* Pagination */}
          <ScrollPaginationDetector key={"pagination"} onPagination={onPagination} />

          {/* Loader */}
          {loading && <LoadingComponent />}

          {/* Error */}
          {error && <Typography sx={{ textAlign: "center" }} color="error">{error}</Typography>}

        </Box>

      </Container>
    </Box>

  );
};

// Prop types definition
NewsFeed.propTypes = {
  serviceFn: PropTypes.func.isRequired,  // Function prop type
  filter: PropTypes.object,          // Optional object filter
};



export default NewsFeed;
