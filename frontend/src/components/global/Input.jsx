import { TextField } from "@mui/material";
import PropTypes from "prop-types";
/**
 * A reusable Input component that renders a styled MUI TextField.
 *
 * It supports various props for customization, including label, type,
 * size, and variant, with default values for flexibility.
 *
 * @function
 * @param {Object} props Component props
 * @param {string} props.label The label to display above the input field.
 * @param {string} [props.type="text"] The type of the input field (e.g., "text", "email", "password").
 * @param {boolean} [props.fullWidth=true] Whether the input field should occupy the full width of its container.
 * @param {boolean} [props.required=true] Whether the input field is required.
 * @param {"outlined" | "filled" | "standard"} [props.variant="outlined"] The variant of the input field (outlined, filled, or standard).
 * @param {Object} [props.sx] Custom CSS styles for the input field.
 * @param {string} props.value The value of the input field.
 * @param {string} props.name The name attribute of the input field.
 * @param {function} props.onChange The function to be called when the input field's value changes.
 * @param {"small" | "medium"} [props.size="small"] The size of the input field (small or medium).
 * @returns {ReactElement} The rendered Input component.
 */
const Input = ({
  label,
  type = "text",
  fullWidth = true,
  required = true,
  variant = "outlined",
  sx = {},
  value,
  name,
  onChange,
  size = "small",
  ...props
}) => (
  <TextField
    label={label}
    type={type}
    fullWidth={fullWidth}
    required={required}
    variant={variant}
    sx={sx}
    value={value}
    name={name}
    onChange={onChange}
    size={size}
    {...props}
  />
);

// Define PropTypes for Input component
Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  sx: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium"]),
};

export default Input;
