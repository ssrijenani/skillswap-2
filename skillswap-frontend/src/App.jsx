import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import Sessions from './pages/Sessions';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/sessions" element={<Sessions />} />
        </Route>

        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
              <p className="text-slate-500 mb-4">Page not found</p>
              <a href="/" className="text-blue-600 hover:underline text-sm">
                Go Home
              </a>
            </div>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
