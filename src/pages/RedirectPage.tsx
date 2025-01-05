// pages/RedirectPage.tsx
'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';

export default function RedirectPage() {
  const navigate = useNavigate();
  const { authState } = useOCAuth();

  const loginSuccess = () => {
    navigate('/'); // Redirect after successful login
  };

  const loginError = (error) => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent() {
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
    return <div>Loading....</div>;
  }

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  );
}
