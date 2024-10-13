import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/i18n';
import Master from './theme/AppMaster';
import './App.css';
import './environments/Global';
import './environments/API';

function App() {
  return (
    <>
      {
        <Router>
          <Routes>
            <Route path={global.ROUTE_HOME} name="Home" element={<Master />} />
          </Routes>
        </Router>
      }
    </>
  )
}

export default App;
