import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Questionnaire from './Questionnaire';
import TreatmentsPage from './TreatmentsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/treatments" element={<TreatmentsPage/>} />
          <Route path="/" element={<Questionnaire/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;