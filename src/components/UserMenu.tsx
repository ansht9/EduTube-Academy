// components/UserMenu.tsx
import { useOCAuth } from '@opencampus/ocid-connect-js';

export const UserMenu: React.FC = () => {
  const { authState, ocAuth } = useOCAuth();

  const handleLogout = async () => {
    // Clear auth state and redirect to home
    window.location.href = '/';
  };

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-300">
        Welcome, {authState.OCId}
      </span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm bg-gray-700 rounded hover:bg-gray-600"
      >
        Logout
      </button>
    </div>
  );
};