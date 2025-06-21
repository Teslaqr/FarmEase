import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { authToken } = useAuth();

  // still checking localStorage on mount
  if (authToken === undefined) {
    return null; // or a spinner if you prefer
  }

  // if we have a token, render children; otherwise redirect
  return authToken ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
