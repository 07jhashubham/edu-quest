import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
  Dialog,
  Slide,
  keyframes,
} from "@mui/material";

// Custom keyframes for additional cool animations
const bounceIn = keyframes`
  0% {
    transform: translateY(-100%) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(20%) scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

function QuestionList() {
  const [questions] = useState([
    {
      id: 1,
      text: "What is React?",
      options: ["Library", "Framework", "Language", "Tool"],
    },
    {
      id: 2,
      text: "What is JSX?",
      options: ["HTML", "JavaScript", "XML", "Syntax"],
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [tokens, setTokens] = useState(0);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setSelectedOption(null);
    setExplanation("");
  };

  const handleAnswerSubmit = () => {
    setTokens(tokens + 1);
    setSelectedQuestion(null);
    alert("Your answer has been submitted!");
  };

  return (
    <Box sx={{ padding: 2 }}>
      {questions.map((question, index) => (
        <Slide
          direction={index % 2 === 0 ? "left" : "right"}
          in={true}
          timeout={2000} // Animation duration of 2 seconds
          key={question.id}
        >
          <Box
            sx={{
              marginBottom: 3,
              padding: 3,
              backgroundColor: "background.default",
              borderRadius: 2,
              boxShadow: 5,
              cursor: "pointer",
              animation: `${bounceIn} 2s ease`, // Apply custom bounce-in animation
              "&:hover": {
                backgroundColor: "accent1.main",
                color: "#FFF",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease, background-color 0.3s ease",
            }}
            onClick={() => handleQuestionClick(question)}
          >
            <Typography variant="h6">{question.text}</Typography>
          </Box>
        </Slide>
      ))}

      <Dialog
        open={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      >
        {selectedQuestion && (
          <Box
            sx={{
              padding: 4,
              backgroundColor: "accent2.main",
              borderRadius: 2,
              color: "#FFF",
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">{selectedQuestion.text}</Typography>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(parseInt(e.target.value, 10))}
              sx={{ mt: 2, mb: 2 }}
            >
              {selectedQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio sx={{ color: "accent1.main" }} />}
                  label={option}
                  sx={{ color: "#FFF" }}
                />
              ))}
            </RadioGroup>
            <TextField
              label="Explain your answer (optional)"
              multiline
              fullWidth
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              sx={{
                backgroundColor: "#FFF",
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleAnswerSubmit}
              sx={{ mt: 2, fontWeight: "bold", color: "#FFF" }}
            >
              Submit Answer
            </Button>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

export default QuestionList;
