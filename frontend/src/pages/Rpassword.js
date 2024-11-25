import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Rpassowrd() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: "480px",
          height: "330px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          marginBottom="25px"
          color="#142D63"
          gutterBottom
        >
          Reset your password?
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password..."
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter your confirm password..."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Rpassowrd;
