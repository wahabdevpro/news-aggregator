import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import localRoutes from '../../utils/localRoutes';

/**
 * ProtectedRoute component to guard routes that require authentication.
 *
 * @param {Object} props - The props object.
 * @param {React.Component} props.element - The component to render if authenticated.
 * @param {string} [props.redirectTo=localRoutes.auth] - The path to redirect to if not authenticated.
 * @param {...Object} rest - Additional props to pass to the component.
 * @returns {JSX.Element} - The rendered component if authenticated, otherwise a redirect.
 */
const ProtectedRoute = ({ element: Component, redirectTo = localRoutes.auth, ...rest }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;