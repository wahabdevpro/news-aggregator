import { Box, Typography, Link, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

/**
 * Utility function to render links in the footer
 * @param {Object} props - The props object
 * @param {string} props.label - Text for the link
 * @param {string} props.url - URL the link directs to
 * @returns {JSX.Element} - MUI Link component
 */
const FooterLink = ({ label, url }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener"
    underline="none"
    color="white"
  >
    {label}
  </Link>
);

// PropTypes for FooterLink
FooterLink.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

/**
 * Footer component for the news aggregator project.
 *
 * This component provides a simple and responsive footer with copyright information and technology stack links.
 *
 * @component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const technologies = [
    { label: "React", url: "https://reactjs.org/" },
    { label: "MUI", url: "https://mui.com/" },
    { label: "Laravel", url: "https://laravel.com/" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg">
        {/* Copyright Information */}
        <Typography variant="body1" align="center" color="white">
          &copy; {currentYear} News Aggregator - All rights reserved.
        </Typography>

        {/* Technology Stack Information */}
        <Typography variant="body2" align="center" color="white">
          Built with{" "}
          {technologies.map((tech, index) => (
            <Typography
              key={tech.label}
              component="span"
              variant="body2"
              color="white"
            >
              <FooterLink label={tech.label} url={tech.url} />
              {index < technologies.length - 1 && ", "}
            </Typography>
          ))}
          , and powered by various news APIs.
        </Typography>
      </Container>
    </Box>
  );
};

export default memo(Footer);
