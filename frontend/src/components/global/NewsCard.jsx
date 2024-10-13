import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { Helper } from "../../utils/helper";

/**
 * NewsCard component that displays an individual news.
 * It includes the title, author, published date, and summary.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.news - The news data.
 * @param {string} props.news.urlToImage - The URL of the news image
 * @param {string} props.news.title - The news title
 * @param {string} props.news.description - The news description
 * @param {string} props.news.author - The news author
 * @param {string} props.news.url - The URL of the news
 * @param {string} props.news.publishedAt - The date the news was published
 * @param {string} props.news.mSource - The source of the news
 */
const NewsCard = ({ news }) => {

  // If urlToImage is empty then display a placeholder image
  const urlToImage = news.urlToImage || "/images/place_holder_img.jpg";

  return (
    <Box
      onClick={() => Helper.openInNewTab(news.url)} // Navigate on news click
      sx={{ cursor: "pointer", mb: 3 }} // Add spacing between cards
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        <Box
          component="img"
          src={urlToImage}
          alt={news.title}
          sx={{
            width: { xs: "100%", md: 200 }, // Full width on small devices, fixed width on larger
            height: { xs: 200, md: "100%" }, // Fixed height on small devices, full height on larger
            objectFit: "cover",
            alignSelf: { xs: "center", md: "center" }, // Center the image on smaller devices
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Vertically center content on larger devices
            textAlign: { xs: "center", md: "left" }, // Center text on small devices, left-align on larger
            p: 2,
          }}
        >
          {/* Display the news title */}
          <Typography variant="h6" gutterBottom>
            {news.title}
          </Typography>

          {/* Display the news author and metadata */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center", // Ensures items are vertically centered
              mb: 1,
            }}
          >
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
              {news.author || "Unknown Author"}
            </Typography>
          </Box>

          {/* Display the news date */}
          <Box sx={{mt: 2}}>
            <Typography variant="body2" color="textSecondary">
              Published at: {Helper.formatIsoDate(news.publishedAt)}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: 'bold' }}
            >
              Source: {news.mSource}
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    urlToImage: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
    mSource: PropTypes.string,
  }).isRequired,
};

export default NewsCard;