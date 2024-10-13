import { Typography, Button, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * NotFoundPage component that displays a 404 error message and provides navigation options.
 *
 * This component adheres to DRY, KISS, and SOLID principles by being simple, reusable,
 * and easy to maintain. It provides a clean message to the user and allows them to navigate
 * back to the homepage.
 *
 * @component
 * @param {Object} props Component properties
 * @param {string} [props.message="Sorry, the page you're looking for doesn't exist."] Optional custom message to display
 * @param {string} [props.buttonText="Go to Homepage"] Optional custom text for the button
 * @returns {JSX.Element} The rendered component
 */
const NotFoundPage = ({
  message = "Sorry, the page you're looking for doesn't exist.",
  buttonText,
}) => {
  const navigate = useNavigate();

  /**
   * Handles the navigation back to the homepage.
   */
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
        {message || "Sorry, the page you're looking for doesn't exist."}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        {buttonText || "Go to Homepage"}
      </Button>
    </Container>
  );
};

// PropTypes for NotFoundPage
NotFoundPage.propTypes = {
  message: PropTypes.string, // Optional custom message to display
  buttonText: PropTypes.string, // Optional custom text for the button
};

export default memo(NotFoundPage);
