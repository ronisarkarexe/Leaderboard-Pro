import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { Checkbox } from '@material-ui/core'
import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightTheme } from './theme.js';

import { CodeforcesTable } from './components/CodeforcesTable.js';

import { ThemeProvider } from '@material-ui/core/styles';


function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = localStorage.getItem("darkMode")
    ? localStorage.getItem("darkMode") === "true"
    : prefersDark;
  const [darkMode, setDarkMode] = useState(isDark);


  const [codeforcesUsers, setCodeforcesUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/codeforces/')
      .then(res => res.json())
      .then(res => {
        setCodeforcesUsers(res)
      })

  }, [])

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {darkMode ? "Dark" : "Light"}
          <Checkbox checked={darkMode} onClick={() => toggleDarkMode()} />

          <CodeforcesTable codeforcesUsers={codeforcesUsers} />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
