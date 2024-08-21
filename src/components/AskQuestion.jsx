import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = () => {
    console.log({ question, options });
    // Add your submission logic here
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "accent2.main",
        borderRadius: 2,
        boxShadow: 3,
        color: "#FFF",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Ask a New Question
      </Typography>
      <TextField
        label="Enter your MCQ question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2, backgroundColor: "#FFF", borderRadius: 1 }}
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          label={`Option ${index + 1}`}
          variant="outlined"
          fullWidth
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          sx={{ mb: 2, backgroundColor: "#FFF", borderRadius: 1 }}
        />
      ))}
      <IconButton onClick={handleAddOption} sx={{ color: "#FF6F61", mb: 2 }}>
        <AddCircleOutline />
      </IconButton>
      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        sx={{ mt: 2, fontWeight: "bold", color: "#FFF" }}
      >
        Submit Question
      </Button>
    </Box>
  );
}

export default AskQuestion;
