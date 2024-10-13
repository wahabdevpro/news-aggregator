import React, { useState } from "react";
import { IconButton, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/slices/alertSlice";
import localRoutes from "../../utils/localRoutes";


const MemberMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {

        // Handle logout
        AuthService.logout();

        // Show alert
        dispatch(showAlert({
            message: "Logout successful!",
            severity: "success",
        }));

        handleClose();

        // Redirect to the login page
        navigate(localRoutes.auth);

    };

    const handlePreferences = () => {
        
        // Redirect to the preferences page
        navigate(localRoutes.preferences);
        
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick} >
                <Avatar alt="Member Icon" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handlePreferences}>
                    <Settings sx={{ mr: 1, fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                } }} />
                    Preferences
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>

        </>
    );
};

export default MemberMenu;
