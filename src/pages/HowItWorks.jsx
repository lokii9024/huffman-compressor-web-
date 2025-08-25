import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CompressIcon from "@mui/icons-material/Compress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function HowItWorks() {
  const steps = [
    {
      icon: <CloudUploadIcon fontSize="large" />,
      title: "Upload Your File",
      description:
        "Choose a text or supported file from your device that you want to compress.",
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: "Analyze Frequencies",
      description:
        "The system analyzes character frequencies and builds the Huffman Tree.",
    },
    {
      icon: <CompressIcon fontSize="large" />,
      title: "Generate Codes",
      description:
        "Unique variable-length codes are assigned to characters based on frequency.",
    },
    {
      icon: <CheckCircleIcon fontSize="large" />,
      title: "Get Results",
      description:
        "Download the compressed file or view stats like compression ratio and savings.",
    },
  ];

  const instructions = [
    "Supported file types: .txt, .csv, .json, .xml",
    "Larger files compress better due to more patterns",
    "Compression is lossless — no data is lost",
    "Decompression restores your exact original file",
    "For best performance, use text-based files under 5MB",
  ];

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 6,
            background: "linear-gradient(90deg, #42a5f5, #90caf9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          How It Works
        </Typography>

        {/* Steps */}
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  },
                }}
              >
                <Box sx={{ mb: 2, color: "#42a5f5" }}>{step.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Instructions */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #42a5f5, #90caf9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Instructions for Users
          </Typography>

          <Paper
            elevation={6}
            sx={{
              p: 4,
              mt: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.05)",
              color: "white",
            }}
          >
            <List>
              {instructions.map((instruction, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#42a5f5" }} />
                  </ListItemIcon>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
