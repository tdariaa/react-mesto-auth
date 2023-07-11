import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
    console.log({ element: Component, ...props  });
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to="/signup" replace />
    )
};

export default ProtectedRouteElement;