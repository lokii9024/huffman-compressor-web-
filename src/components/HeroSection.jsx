import React from "react";
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 10 },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                lineHeight: 1.2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              }}
            >
              Fast & Efficient <br />
              <span style={{ color: "#42a5f5" }}>Huffman Compression</span>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                maxWidth: { xs: "100%", md: "600px" },
                mx: { xs: "auto", md: "0" },
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              Compress your text files quickly using Huffman Coding algorithm.
              Lightweight, accurate, and visually interactive — built for
              learning and real-world use.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button
                component={Link}
                to="/get-started"
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: "30px",
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  px: { xs: 3, md: 4 },
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>

          {/* Right Illustration */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/2950/2950670.png"
              alt="Compression Illustration"
              sx={{
                width: { xs: "70%", sm: "60%", md: "80%" },
                maxWidth: "400px",
                filter: "drop-shadow(0px 8px 20px rgba(0,0,0,0.4))",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
