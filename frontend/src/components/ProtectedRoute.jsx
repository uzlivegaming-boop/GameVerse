import { useAuth } from '@clerk/react';

import {
  Navigate
} from 'react-router';


function ProtectedRoute({
  children
}) {

  const {
    isLoaded,
    isSignedIn
  } = useAuth();


  if (!isLoaded) {
    return (
      <div className="loading-screen">
        Yuklanmoqda...
      </div>
    );
  }


  if (!isSignedIn) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return children;
}


export default ProtectedRoute;