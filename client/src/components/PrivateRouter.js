import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRouteHome = () => {
 const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

 return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PrivateRouteLogin = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   
    return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
   };
   
// export default PrivateRoute;
