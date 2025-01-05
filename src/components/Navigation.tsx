import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, GraduationCap } from 'lucide-react';
import { useOCAuth } from '@opencampus/ocid-connect-js';

export const Navigation: React.FC = () => {
  const { authState } = useOCAuth();
  const OCId = authState?.OCId; // Assuming OCId is part of the authState

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-white">
          Learning Platform
        </NavLink>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm ${
                isActive ? 'text-green-500' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            <Home size={20} />
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm ${
                isActive ? 'text-green-500' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            <User size={20} />
            Profile
          </NavLink>
          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm ${
                isActive ? 'text-green-500' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            <GraduationCap size={20} />
            Certificates
          </NavLink>
        </div>
        {OCId && <pre className="text-white">{OCId}</pre>} {/* Display OCID */}
      </div>
    </nav>
  );
};
// QmbkXWwcaaroD2TAVvpHzhaFYe3L4ybEPmpiKpofC42fTj