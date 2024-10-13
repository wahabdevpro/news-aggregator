import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Input from "./Input"; // Custom Input Component
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

/**
 * DatePickerComponent allows users to select individual "From" and "To" dates.
 * This component is reusable and can be used across different forms.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string[]} props.dateRange - The current selected date range [startDate, endDate].
 * @param {function} props.setDateRange - Function to update the selected date range.
 * @returns {JSX.Element} - The DatePickerComponent.
 */
const DateRangePickerComponent = ({ dateRange, setDateRange }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);


  // Setup the local state from the dateRange, as dateRange is the array of [startDate, endDate], of iso date strings
  useEffect(() => {

    if (dateRange && dateRange.length > 0) {

      // Convert the iso date strings to dayjs objects
      if (dateRange[0]) {
        const startDate = dayjs(dateRange[0]);
        setFromDate(startDate);
      }

      if (dateRange[1]) {
        const endDate = dayjs(dateRange[1]);
        setToDate(endDate);
      }
  

    }

  }, []);

  useEffect(() => {

    const dateRange = [];

    // Convert from date to the iso string
    if (fromDate) dateRange.push(fromDate.toISOString());

    // Convert to date to the iso string
    if (toDate) dateRange.push(toDate.toISOString());

      // Update the date range
      setDateRange(dateRange);
      

  }, [fromDate, toDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" justifyContent="space-between" gap={2}>
        {/* From Date Picker */}
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={(newValue) => setFromDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
          maxDate={dayjs()}  // Use dayjs() to set the maximum date to today

        />

        {/* To Date Picker */}
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={(newValue) => setToDate(newValue)}
          minDate={fromDate} // Ensure the "To Date" is after "From Date"
          maxDate={dayjs()}  // Use dayjs() to set the maximum date to today
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

// PropTypes for DateRangePickerComponent
DateRangePickerComponent.propTypes = {
  dateRange: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired, // Date range as an array of two strings [startDate, endDate]
  setDateRange: PropTypes.func.isRequired, // Function to update date range
};

export default DateRangePickerComponent;
