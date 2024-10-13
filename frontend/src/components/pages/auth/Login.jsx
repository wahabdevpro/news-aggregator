import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../../global/Input";
import Btn from "../../global/Button";
import ActionLinkBtn from "../../global/ActionLinkBtn";
import { Helper } from "../../../utils/helper";
import { useForm } from "../../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../redux/slices/alertSlice";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { useState } from "react";

/**
 * Login component that renders a login form and handles form submission.
 *
 * This component allows users to log in by providing their email and password.
 * It handles form validation using the `useForm` hook and displays errors for invalid inputs.
 * Upon successful validation, it triggers the login process.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {function} props.setPage - Function to switch between login and signup pages.
 * @returns {JSX.Element} - The rendered login form component.
 */
const Login = ({ setPage }) => {

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inputs, errors, handleChange, validate } = useForm(
    // Initial values for the login form
    { email: "", password: "" },
    // Validation rules for the login form
    {
      email: Helper.validators.email,
      password: Helper.validators.password,
    }
  );


  // Detect Enter keypress and trigger submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(); // Call handleSubmit if Enter key is pressed
    }
  };

  const afterSubmit = (isSuccess, data) => {

    setSubmitting(false);

    if (!isSuccess) {
      dispatch(showAlert({ message: data, severity: "error" }));
    } else {
      dispatch(showAlert({ message: "Login successful!", severity: "success" }));
      navigate("/");
    }

  }

  /**
   * Handles the login form submission and displays an alert message
   * based on the validation result.
   */
  const handleSubmit = async () => {

    setSubmitting(true);

    try {

      // If fields are not valid
      const validated = validate();
      if (!validated.success)  return afterSubmit(false, validated.firstError || "Invalid input");

      // Call the login API with the email and password
      const response = await AuthService.login(inputs.email, inputs.password);

      // If error
      if (!response.success) return afterSubmit(false, response.data);

      // We are here it means the login was successful
      return afterSubmit(true, response.data);


    } catch (error) {

      return afterSubmit(false, error.message || "An unexpected error occurred");

    }
  };

  return (
    <Box component="form" sx={{ width: "100%" }}>
      <Typography textAlign={"center"} sx={{ mb: 4 }} variant="h5" gutterBottom>
        Login to your account
      </Typography>
      <Input
        // Email address input field
        label="Email Address"
        required
        fullWidth
        name="email"
        value={inputs.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onKeyPress={handleKeyPress}
        key={"email"}
        sx={{ mb: 2 }}
      />
      <Input
        // Password input field
        label="Password"
        required
        fullWidth
        name="password"
        type="password"
        value={inputs.password}
        onChange={(e) => handleChange("password", e.target.value)}
        onKeyPress={handleKeyPress}
        key={"password"}
        sx={{ mb: 2 }}
      />

      <Btn text="Login" isLoading={submitting} onClick={handleSubmit} key={"btn"} />

      <ActionLinkBtn
        // Link to the signup page
        key={"register"}
        text="Not registered?"
        buttonText="Register"
        onClick={() => setPage("register")}
      />
    </Box>
  );
};
export default Login;

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};
