import { useState } from "react";
// import { Helper } from "./helper";
/**
 * Custom hook to manage form state and validation.
 *
 * This hook simplifies form handling by managing input state, validation,
 * and error messages based on the provided validators.
 *
 * @param {Object} initialValues - Initial values for the form inputs.
 * @param {Object} validators - Validation functions for each input field.
 * @returns {Object} - An object containing form inputs, errors, change handler, and validation function.
 */
export const useForm = (initialValues, validators) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };


  const returnObj = (success, errors) => {

    // If have the errors object then get the first error
    const firstError = errors ? Object.values(errors)[0] : null;

    return { success, errors, firstError };

  }

  // Handle form submission and validation
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    // // Validate inputs using the validators passed to the hook
    // for (let key in inputs) {
    //   if (validators[key] && !validators[key](inputs[key])) {
    //     newErrors[key] = `${
    //       key.charAt(0).toUpperCase() + key.slice(1)
    //     } is invalid`;
    //     isValid = false;
    //   }
    // }

     // Validate inputs using the validators passed to the hook
     for (let key in inputs) {
      const value = inputs[key];
      
      // Check if the field is empty
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      } else if (validators[key] && !validators[key](value)) {
        // If the field is not empty, but still fails the custom validation
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is invalid`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    
    return returnObj(isValid, newErrors);
    
  };

  return {
    inputs,
    errors,
    handleChange,
    validate,
  };
};
