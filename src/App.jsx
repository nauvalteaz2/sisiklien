import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReportLayout from './layouts/ReportLayout';

const App = () => {
  return (
    <Router>
      <ReportLayout />
    </Router>
  );
};

export default App;
