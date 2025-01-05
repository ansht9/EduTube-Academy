// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { LearningPage } from './pages/LearningPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { CongratsPage } from './pages/CongratsPage';
import OCConnectWrapper from './components/OCConnectWrapper';
import RedirectPage from './pages/RedirectPage'; // Import the RedirectPage component

function App() {
  const opts = {
    redirectUri: 'http://localhost:5173/redirect', // Adjust this URL
    referralCode: 'PARTNER6', // Assign partner code
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          <Navigation />
          <main className="p-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/learning/:playlistId" element={<LearningPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/congrats/:playlistId" element={<CongratsPage />} />
              <Route path="/redirect" element={<RedirectPage />} /> {/* Add the route for RedirectPage */}
            </Routes>
          </main>
        </OCConnectWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
