import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = () => {
  return (
     props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
)};

export default ProtectedRouteElement;