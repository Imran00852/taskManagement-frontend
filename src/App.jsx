import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import axios from "axios";
import { server } from "./constants/config";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Skeleton } from "@mui/material";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`${server}/users/my`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExist(data.user));
      })
      .catch((err) => {
        dispatch(userNotExist(null));
      });
  }, []);
  return loader ? (
    <Skeleton />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
