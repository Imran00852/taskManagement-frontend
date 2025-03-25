import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import { userExist, userNotExist } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        id: toastId,
      });
      dispatch(userExist(data.user));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
      dispatch(userNotExist(null));
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Registering user...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        id: toastId,
      });
      dispatch(userExist(data.user));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
      dispatch(userNotExist(null));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      component={"main"}
      sx={{
        height: "100vh",
        display: "flex",
        marginTop: "2rem",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 4,
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleLogin}
            >
              <TextField
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={loading}
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="text"
                fullWidth
                onClick={() => setIsLogin((prev) => !prev)}
                disabled={loading}
              >
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleRegister}
            >
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "1rem" }}
                fullWidth
                disabled={loading}
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="text"
                fullWidth
                onClick={() => setIsLogin((prev) => !prev)}
                disabled={loading}
              >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
