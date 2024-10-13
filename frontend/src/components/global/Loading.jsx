import { CircularProgress, LinearProgress, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A versatile Loading component that can be used for both section-level and full-page loading states.
 * It supports both circular and linear loaders, customizable sizes, and allows for optional messages.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {boolean} props.fullPage - Whether to display the loader in full-page mode.
 * @param {string} props.type - The type of loader ("circular" or "linear").
 * @param {string} props.message - Optional loading message to display.
 * @param {number} props.size - Optional size for the circular loader (ignored for linear loader).
 */
const LoadingComponent = ({ fullPage = false, type = "circular", message = "", size = 35 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: fullPage ? "100vw" : "100%",
        height: fullPage ? "100vh" : "auto",
        position: fullPage ? "fixed" : "relative",
        top: 0,
        left: 0,
        bgcolor: fullPage ? "rgba(255, 255, 255, 0.9)" : "transparent",
        zIndex: fullPage ? 1300 : "auto",
        p: fullPage ? 4 : 2,
      }}
    >
      {type === "circular" ? (
        <CircularProgress color="primary" size={size} />
      ) : (
        <LinearProgress color="primary" sx={{ width: "100%" }} />
      )}
      {message && (
        <Typography sx={{ mt: 2 }} variant="body1" color="textSecondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

// PropTypes for Loading component
LoadingComponent.propTypes = {
  fullPage: PropTypes.bool, // Whether to show as full page
  type: PropTypes.oneOf(["circular", "linear"]), // The type of loader
  message: PropTypes.string, // Optional loading message
  size: PropTypes.number, // Size for circular loader (ignored for linear)
};



export default LoadingComponent;
