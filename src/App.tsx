import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ObservationList from './pages/ObservationList';
import CreateObservation from './pages/CreateObservation';
import ObservationDetail from './pages/ObservationDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-[100dvw] overflow-y-scroll overflow-x-hidden scrollbar-hide bg-gradient-to-br from-white via-blue-100 to-blue-200 animate-gradient">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <Routes>
            <Route path="/" element={<ObservationList />} />
            <Route path="/observations" element={<ObservationList />} />
            <Route path="/observations/new" element={<CreateObservation />} />
            <Route path="/observations/:id" element={<ObservationDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;