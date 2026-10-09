import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router';

import Layout from './components/Layout';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';

import Dashboard from './pages/Dashboard';

import Games from './pages/Games';

import Favorites from './pages/Favorites';

import Notifications from './pages/Notifications';

import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
/>


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />


          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />


          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />


          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;