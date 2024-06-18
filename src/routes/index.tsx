/* eslint-disable react-refresh/only-export-components */
import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { AuthContext } from "../context";
import { Dashboard, Home } from "../pages";

export const PrivateRoute = () => {
  const { user, authenticating } = useContext(AuthContext);
  return authenticating ? (
    <section className="loader">
      <RotatingLines strokeColor="#ddd" />
      <div className="loader-text">
        <p>Please wait...</p>
      </div>
    </section>
  ) : user ? (
    <Outlet context={user} />
  ) : (
    <Navigate to="/" />
  );
};

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Home />} />
    </>,
  ),
);
