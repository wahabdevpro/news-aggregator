import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

/**
 * A customizable button component that supports loading states.
 *
 * This component renders a MUI Button with an optional loading spinner
 * when `isLoading` is true. It supports various customization options
 * such as color, variant, and full-width styling.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.text - The text to display inside the button.
 * @param {function} props.onClick - Function to handle the button click event.
 * @param {string} props.color - Button color (default: "primary").
 * @param {boolean} props.fullWidth - Whether the button should take the full width of its container.
 * @param {string} props.variant - Button variant (default: "contained").
 * @param {object} props.sx - MUI sx style object for custom styling.
 * @param {boolean} props.isLoading - Whether the button should show a loading spinner.
 * @param {string} props.type - Button type (default: "button").
 * @returns {JSX.Element} - The rendered button component.
 */
const Btn = ({
  text,
  onClick,
  color = "primary",
  fullWidth = true,
  variant = "contained",
  sx = {},
  isLoading = false,
  type = "button",
}) => (
  <Button
    onClick={isLoading ? null : onClick}
    type={type}
    color={color}
    fullWidth={fullWidth}
    variant={variant}
    sx={sx}
  >
    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : text}
  </Button>
);

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(["primary", "secondary", "inherit", "default"]),
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  sx: PropTypes.object,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Btn;
