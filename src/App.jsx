import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './components/i18n'
import Master from './theme/AppMaster'
import './App.css'
import './environments/Global'
import './environments/API'
import { CartProvider } from './functions/context/CartProvider'

function App() {
  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path={global.ROUTE_HOME} name="Home" element={<Master />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
