import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Login from '../Pages/Login';
import Calendar from '../Pages/Calendar';
import Meeting from '../Pages/Meeting';

export default function NavRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          (
            <AuthRoute>
              <Calendar />
            </AuthRoute>
          )
        }
      />
      <Route
        path="/meeting"
        element={
          (
            <AuthRoute>
              <Meeting />
            </AuthRoute>
          )
        }
      />
      <Route
        path="/meeting/:id"
        element={
          (
            <AuthRoute>
              <Meeting />
            </AuthRoute>
          )
        }
      />
    </Routes>
  );
}
