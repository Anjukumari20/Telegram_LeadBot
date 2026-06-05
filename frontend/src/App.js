import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadList from "./pages/LeadList";
import LeadDetail from "./pages/LeadDetail";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Bot from "./pages/Bot";

function App() {
  return (
    <BrowserRouter>
    

      {/* Page background */}
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "40px" }}>
        <Routes>
          {/* Default route - redirect to bot */}

          <Route path="/" element={<Bot />} />
          {/* Default route - redirect to login */}
          <Route path="/login" element={<Login />} />  

          {/* Register route */}
          <Route path="/register" element={<Register />} />

          {/* Home page - list of all leads */}
          <Route path="/leads" element={
            <ProtectedRoute>
              <LeadList />
            </ProtectedRoute>
          } />

          {/* Detail page - single lead */}
          <Route path="/leads/:id" element={
            <ProtectedRoute>
              <LeadDetail />
            </ProtectedRoute>
          } />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
