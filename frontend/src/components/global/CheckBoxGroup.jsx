import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import PropTypes from "prop-types";
/**
 * CheckboxGroup is a reusable component for rendering a group of checkboxes.
 * This component is used to avoid repeating similar logic for categories and sources.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object.<string, string>} props.items - The list of items (categories or sources) to render.
 * @param {Array} props.selectedItems - The currently selected items.
 * @param {function} props.onItemChange - The function to handle item selection change.
 */
const CheckboxGroup = ({ items, selectedItems, onItemChange }) => {

  // Get the items keys
  const keys = Object.keys(items);
  
  return (
  <FormGroup>
    {keys.map((key) => (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            checked={selectedItems.includes(key)}
            onChange={() => onItemChange(key)}
          />
        }
        label={items[key]}
      />
    ))}
  </FormGroup>
)};

export default CheckboxGroup;

// PropTypes for CheckboxGroup
CheckboxGroup.propTypes = {
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedItems: PropTypes.array.isRequired,
  onItemChange: PropTypes.func.isRequired,
};
