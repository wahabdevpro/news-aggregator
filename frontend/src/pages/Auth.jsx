// Importing necessary modules and components from MUI and React
import { Container } from "@mui/material";
import Login from "../components/pages/auth/Login"; // Importing the Login component
import Register from "../components/pages/auth/Register"; // Importing the Register component
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helper } from "../utils/helper";

/**
 * The main component that renders the login and register pages based on the state variable "page".
 * @returns {JSX.Element} - The component that renders the login and register pages.
 */
const AuthPage = () => {
  const [page, setPage] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by checking the token in localStorage
    const token = Helper.localStorage.getItem("token");
    console.log(token);
    if (!token.success) {
      // If token is found, redirect to the homepage
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container sx={{ width: "100%", marginTop: "2rem", marginBottom: "2rem" }} maxWidth="sm">
      {page === "login" ? (
        <Login setPage={setPage} />
      ) : (
        <Register setPage={setPage} />
      )}
    </Container>
  );
};

export default AuthPage;
