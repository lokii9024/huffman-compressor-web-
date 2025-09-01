import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CompressIcon from "@mui/icons-material/Compress";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { compressFile,decompressFile } from "../utils/huffman";

export default function GetStarted() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResults(null); // reset results if new file uploaded
      toast.success(`File uploaded: ${uploadedFile.name}`, {
        position: "bottom-right",
      });
    }
  };

  const handleCompress = async () => {
    if (!file) {
      return toast.error("Please upload a file first!", {
        position: "bottom-right",
      });
    }

    //if file if not text file
    if (!file.name.endsWith(".txt") && !file.name.endsWith(".csv") && !file.name.endsWith(".json") && !file.name.endsWith(".xml")) {
      return toast.error("Only .txt, .csv, .json, .xml files can be compressed!", {
        position: "bottom-right",
      });
    }

    const startTime = performance.now();
    const result = await compressFile(file)
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);
    //time taken for compression

    if(!result){
      return toast.error("Compression was not effective. Compressed file is larger than original file.", { position: "bottom-right" });
    }

    setResults({
      action: "Compression",
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      ratio: result.ratio,
      savedSpace: result.saved,
      timeTaken
    });

    toast.success("File compressed successfully!", { position: "bottom-right" });
  };

  const handleDecompress = async () => {
    if (!file) {
      return toast.error("Please upload a .huff file first!", {
        position: "bottom-right",
      });
    }
    if (!file.name.endsWith(".huff")) {
      return toast.error("Only .huff files can be decompressed!", {
        position: "bottom-right",
      });
    }

    const startTime = performance.now();
    const result = await decompressFile(file);
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);
    //time taken for decompression

    setResults({
      action: "Decompression",
      originalSize: result.originalSize,
      decompressedSize: result.decompressedSize,
      ratio: result.ratio,
      savedSpace: result.saved,
      timeTaken
    });

    toast.success("File decompressed successfully!", { position: "bottom-right" });
  };

  // Helper to format sizes
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 650,
          width: "100%",
          textAlign: "center",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #42a5f5, #90caf9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Get Started
        </Typography>

        {/* File Upload */}
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            mb: 3,
            color: "#fff",
            borderColor: "#90caf9",
            "&:hover": { backgroundColor: "rgba(144,202,249,0.1)" },
          }}
        >
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>

        {/* File Details */}
        {file && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>File:</strong> {file.name}
            </Typography>
            <Typography variant="body2" color="gray">
              {formatSize(file.size)}
            </Typography>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CompressIcon />}
            onClick={handleCompress}
            sx={{
              flex: 1,
              borderRadius: "30px",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            Compress
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<UnarchiveIcon />}
            onClick={handleDecompress}
            sx={{
              flex: 1,
              borderRadius: "30px",
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            Decompress
          </Button>
        </Box>

        {/* Results Panel */}
        {results && (
          <Paper
            elevation={3}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: "15px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              {results.action} Results
            </Typography>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
            {
              // Show different details based on action
              results.action === "Compression" ? (
                <>
                
                </>
              ) : (
                <>
                
                </>
              )
            }
          </Paper>
        )}
      </Paper>

      {/* Toast container */}
      <ToastContainer theme="dark" />
    </Box>
  );
}
