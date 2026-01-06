import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import JobDetails from "./pages/JobDetails";
import JobList from "./pages/JobList";
import "./App.css"
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="app-layout">
      <BrowserRouter>
        <Navbar />
        <main className="app-content">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/contact" element={<Contact />} />


            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard Redirect */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Role Based */}
            <Route
              path="/candidate"
              element={
                <ProtectedRoute role="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter"
              element={
                <ProtectedRoute role="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
