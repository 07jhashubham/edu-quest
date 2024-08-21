import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { AccountCircle, Assignment, EmojiEvents } from "@mui/icons-material";

const randomNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey"];

function DashboardPanel() {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Auto-generate a random name for the user
    const randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    setName(randomName);
    // Simulate a wallet address by generating a random string
    const randomWallet = `0x${Math.random().toString(36).substring(2, 15)}`;
    setWalletAddress(randomWallet);
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "accent2.main", // Updated to match the QuestionList popup theme
        borderRadius: 2,
        boxShadow: 3,
        color: "#FFF", // Ensure text color contrasts with the new background
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{ margin: "auto", bgcolor: "accent1.main", width: 80, height: 80 }}
      >
        <AccountCircle sx={{ fontSize: 50, color: "#00" }} />
      </Avatar>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {name}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <IconButton sx={{ bgcolor: "accent1.main", mr: 1 }}>
          <Assignment sx={{ color: "#00" }} />
        </IconButton>
        <IconButton sx={{ bgcolor: "accent1.main" }}>
          <EmojiEvents sx={{ color: "#00" }} />
        </IconButton>
      </Box>
      <TextField
        label="Wallet Address"
        variant="outlined"
        fullWidth
        value={walletAddress}
        disabled
        sx={{
          backgroundColor: "#FFF",
          borderRadius: 1,
          mt: 2,
          mb: 2,
        }}
      />
      <Typography variant="body1">
        Tokens: <strong>10</strong>
      </Typography>
      <Button
        variant="contained"
        color="success" // Different color for the button for better visibility
        sx={{ mt: 2, fontWeight: "bold", color: "#FFF" }}
      >
        Save Changes
      </Button>
    </Box>
  );
}

export default DashboardPanel;
