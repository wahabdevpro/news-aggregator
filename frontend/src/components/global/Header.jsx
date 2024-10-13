import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./Modal";
import FilterComponent from "./Filter";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import MemberMenu from "./MemberMenu";
import localRoutes from "../../utils/localRoutes";

/**
 * ActionButton component for handling actions like logout, navigation, etc.
 * @param {Object} props - The props object.
 * @param {string} props.label - The button text.
 * @param {function} props.onClick - Function to handle button click.
 */
const ActionButton = ({ label, onClick }) => (
  <Button color="inherit" onClick={onClick}>
    {label}
  </Button>
);

// PropTypes for ActionButton
ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * Header component for the news aggregator project.
 *
 * This component provides a responsive header with navigation links and a search bar.
 *
 * @component
 */
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { isAuthenticated: isLoggedIn } = useSelector((state) => state.auth);


  const handleSearchClick = () => {
    dispatch(openModal()); // Open modal when search button is clicked
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      {/* Modal for filtering news */}
      <CustomModal open={isOpen} handleClose={() => dispatch(closeModal())}>
        <FilterComponent key={"filter_comp"} />
      </CustomModal>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Column layout for small devices (mobile/tablet)
            sm: "row",   // Row layout for larger devices
          },
          justifyContent: "space-between",
          alignItems: "center", // Align items vertically center
          gap: 0,
          padding: "1rem 0"
        }}
      >
        {/* Title / Logo on the first row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center", // Center the title on smaller devices
              sm: "flex-start", // Align title to the left on larger devices
            },
            alignItems: "center",
            flexGrow: 1,
            width: "100%", // Ensure it spans full width on smaller devices
          }}
        >
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              width: "fit-content",
              fontSize: {
                xs: "1.2rem", // font size for small screens (mobile devices)
                sm: "1.5rem", // Increase font size on larger devices
              },
              textAlign: {
                xs: "center", // Center text for small screens
                sm: "left", // Align left for larger screens
              },
            }}
          >
            News Aggregator
          </Typography>
        </Box>

        {/* Search Bar and Action Button on the second row for smaller screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "row", // Row layout for small devices
              sm: "row", // Row layout for larger devices
            },
            alignItems: "center",
            justifyContent: {
              xs: "center", // Center items on small screens
              sm: "flex-end", // Align to the right for larger screens
            },
            gap: 2,
            width: "100%", // Span full width on smaller screens
            mt: {
              xs: 2, // Add margin-top to separate the two rows on small screens
              sm: 0, // No margin for larger screens
            },
          }}
        >

          {/* Search Icon Button */}
          <IconButton
            onClick={handleSearchClick}
            sx={{
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <Search
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                },
              }}
            />
          </IconButton>

          {/* Conditionally Render My Feed Button */}
          {isLoggedIn && (
            <ActionButton label="My Feed" onClick={() => navigate("/")} />
          )}

          {/* News Button */}
          <ActionButton label="News" onClick={() => navigate(localRoutes.news)} />



          {/* Conditionally Render Login or Logout Button */}
          {isLoggedIn ? (
            <MemberMenu key="member_menu" />
          ) : (
            <ActionButton
              label="Login"
              onClick={() => navigate(localRoutes.auth)}
            />
          )}
        </Box>
      </Toolbar>

    </AppBar>
  );
};

export default Header;
