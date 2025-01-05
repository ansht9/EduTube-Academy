// components/LoginButton.tsx
'use client';

import { useOCAuth } from '@opencampus/ocid-connect-js';
import { BookOpen, PlayCircle, Trophy } from 'lucide-react';
import './LoginButton.css';

export default function LoginButton() {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-section">
      <h1 className="heading">Edutube Academy</h1>
      {/* <h2 className="subheading">Discover Learning Playlists from your favorite Creators</h2> */}
      <button className="login-button" onClick={handleLogin}>
        Login using OCID
      </button>
      <div className="note-container">
        <div className="note-item">
        <BookOpen className="icon" style={{ color: 'blue' }} />
          <span>Explore curated playlists</span>
        </div>
        <div className="note-item">
        <PlayCircle className="icon" style={{ color: 'green' }} />
          <span>Start learning and earn rewards as you go</span>
        </div>
        <div className="note-item">
        <Trophy className="icon" style={{ color: 'gold' }} />
          <span>Get NFT-based certifications for completion of a course!</span>
        </div>
      </div>
    </div>
  );
}
