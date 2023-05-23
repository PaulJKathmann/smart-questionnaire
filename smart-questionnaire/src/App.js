import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Questionnaire from './Questionnaire';
import TreatmentsPage from './TreatmentsPage';
import Treatments from './Treatments';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/treatments" element={<Treatments/>} />
          <Route path="/" element={<Questionnaire/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;