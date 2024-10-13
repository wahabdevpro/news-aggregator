import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";

/**
 * A reusable Modal component that can render any component passed as children.
 * @component
 * @param {object} props - The props object.
 * @param {JSX.Element} props.children - The component to be rendered inside the modal.
 * @returns {JSX.Element} - The rendered modal component.
 */
const CustomModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen /* data */ } = useSelector((state) => state.modal);
  
  return (
    <Modal
      // open={open}
      // onClose={handleClose}
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          maxHeight: "90vh", // Limit the height to allow scrolling
          overflowY: "auto", // Enable scrolling for content overflow
          position: "relative",
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeModal())}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Render any component passed as children */}
        {children}
      </Box>
    </Modal>
  );
};

// PropTypes for the Modal
CustomModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomModal;
