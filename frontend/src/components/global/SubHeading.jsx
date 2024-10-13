import { Typography } from "@mui/material";

/**
 * @component
 * @param {object} props
 * @param {string} text
 * @returns 
 */
const SubHeading =({text}) => {
    return (
      <Typography variant="h7" sx={{
        fontWeight: 'bold',
        display: "block"
      }} gutterBottom>
        {text}
      </Typography>
    )
  }
  
  export default SubHeading;