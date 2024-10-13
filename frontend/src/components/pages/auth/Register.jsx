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
 * Register component that renders a registration form and handles form submission.
 *
 * This component allows users to create a new account by providing their full name,
 * email, and password. It validates the input fields using the `useForm` hook and
 * displays appropriate error messages for invalid inputs.
 * Upon successful validation, it triggers the registration process.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {function} props.setPage - Function to switch between signup and login pages.
 * @returns {JSX.Element} - The rendered registration form component.
 */
const Register = ({ setPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**
   * Uses the `useForm` hook to manage form state and validation.
   * @typedef {Object} inputs - Form input data.
   * @typedef {Object} errors - Form validation errors.
   * @typedef {function} handleChange - Function to handle input changes.
   * @typedef {function} validate - Function to validate form inputs.
   */
  const [submitting, setSubmitting] = useState(false);
  const { inputs, errors, handleChange, validate } = useForm(
    { name: "", email: "", password: "" },
    {
      name: Helper.validators.name,
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
   * Handles the registration form submission and displays an alert message
   * based on the validation result.
   */
  const handleSubmit = async () => {

    setSubmitting(true);

    try {

      // If fields are not valid
      const validated = validate();
      if (!validated.success) return afterSubmit(false, validated.firstError || "Invalid input");


       // Call the login API with the email and password
       const response = await AuthService.register(inputs.email, inputs.password, inputs.name);

       console.log("Response", response);

       // If error
       if (!response.success) return afterSubmit(false, response.data);
 

    } catch (error) {

      return afterSubmit(false, error.message || "An unexpected error occurred");

    }

  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h5" sx={{ mb: 4 }} gutterBottom>
        Create a new account
      </Typography>
      <Input
        sx={{ mb: 2 }}
        label="Full Name"
        name="name"
        value={inputs.name}
        onKeyPress={handleKeyPress}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Input
        sx={{ mb: 2 }}
        label="Email"
        name="email"
        value={inputs.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <Input
        sx={{ mb: 2 }}
        label="Password"
        name="password"
        type="password"
        value={inputs.password}
        onKeyPress={handleKeyPress}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <Btn sx={{ mb: 2 }} text="Sign Up" onClick={handleSubmit} />
      <ActionLinkBtn
        text="Already registered?"
        buttonText="Login"
        onClick={() => setPage("login")}
      />
    </Box>
  );
};
Register.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Register;
