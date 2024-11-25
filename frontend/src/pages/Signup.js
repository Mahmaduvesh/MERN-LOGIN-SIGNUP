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

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        handleError(error.details[0].message);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: "450px",
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              name="name"
              label="Name"
              placeholder="Enter your name"
              value={signupInfo.name}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={handleChange}
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              value={signupInfo.email}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={handleChange}
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={signupInfo.password}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <MUILink component={Link} to="/login">
                Log in
              </MUILink>
            </Typography>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default Signup;
