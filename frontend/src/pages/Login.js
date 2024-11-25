import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link as MUILink,
} from "@mui/material";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          fontWeight="bold"
          marginBottom="25px"
          color="#142D63"
          gutterBottom
        >
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            onChange={handleChange}
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email..."
            value={loginInfo.email}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleChange}
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password..."
            value={loginInfo.password}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <MUILink
            component={Link}
            to="/forgot-password"
            variant="body2"
            sx={{ display: "block", mb: 2 }}
          >
            Forgot your password?
          </MUILink>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Doesn't have an account?{" "}
            <MUILink component={Link} to="/signup">
              Signup
            </MUILink>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default Login;
