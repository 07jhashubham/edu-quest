import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Dialog,
  CssBaseline,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Dashboard, QuestionAnswer } from "@mui/icons-material";
import QuestionList from "./components/QuestionList";
import DashboardPanel from "./components/Dashboard";
import AskQuestion from "./components/AskQuestion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6482AD", // Muted Blue
    },
    secondary: {
      main: "#7FA1C3", // Soft Blue
    },
    accent1: {
      main: "#E2DAD6", // Warm Beige
    },
    accent2: {
      main: "#F5EDED", // Soft Pink
    },
    background: {
      default: "#F5EDED", // Soft Pink Background
    },
    text: {
      primary: "#333", // Dark Charcoal
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
      color: "#6482AD",
    },
    h6: {
      color: "#6482AD",
    },
    body1: {
      color: "#333",
    },
  },
});

function App() {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="inherit"
              onClick={() => setOpenQuestionForm(true)}
              sx={{ fontSize: "1rem", fontWeight: "bold", marginRight: 2 }}
              startIcon={<QuestionAnswer />}
            >
              Ask Question
            </Button>
            <Button
              color="inherit"
              onClick={() => setOpenDashboard(true)}
              sx={{ fontSize: "1rem", fontWeight: "bold", marginLeft: 2 }}
              startIcon={<Dashboard />}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ padding: 4 }}>
        <QuestionList />
      </Container>

      <Dialog
        open={openDashboard}
        onClose={() => setOpenDashboard(false)}
        PaperProps={{ style: { borderRadius: 20, backgroundColor: "#E2DAD6" } }}
      >
        <DashboardPanel />
      </Dialog>

      <Dialog
        open={openQuestionForm}
        onClose={() => setOpenQuestionForm(false)}
        PaperProps={{ style: { borderRadius: 20, backgroundColor: "#E2DAD6" } }}
      >
        <AskQuestion />
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
