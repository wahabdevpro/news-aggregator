import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A component that displays an action text alongside a clickable link-styled button.
 *
 * The button text is rendered as clickable text, with hover effects, and is used to trigger an action
 * when clicked. The component also displays an accompanying action message.
 *
 * @component
 * @param {{text: string, buttonText: string, onClick: function}} props Component props
 */
const ActionLinkBtn = ({ text: actionText, buttonText, onClick: handleClick }) => (
  <Box display="flex" alignItems="center" justifyContent="flex-start" mt={2}>
    <Typography>{actionText}</Typography>
    <Typography
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        color: "primary.main",
        ml: 1,
        "&:hover": {
          color: "primary.dark",
          textDecoration: "underline",
        },
      }}
    >
      {buttonText}
    </Typography>
  </Box>
);


ActionLinkBtn.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ActionLinkBtn;
