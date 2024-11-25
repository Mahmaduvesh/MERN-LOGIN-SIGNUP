import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Fpassowrd() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Check your email for reset password link");
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
          width: "450px",
          height: "280px",
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
          Forgot your password?
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            Send Email
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Fpassowrd;
