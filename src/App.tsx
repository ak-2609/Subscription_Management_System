// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import PlanCards from "./pages/plans";
// import MySubscriptions from "./pages/MySubscriptions";
// import Dashboard from "./pages/user_dashboard";
// import ManagePlan from "./pages/ManagePlan";
// import Admindash from "./pages/Admindash";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Login />} />
        
        {/* Signup route */}
        <Route path="/signup" element={<Signup />} />

       {/* /* Admin-Dashboard route
        <Route path="/admindashboard" element={<Dashboard />} />

       
        <Route path="/userdashboard" element={<Dashboard />} />


        {/* Plans route */}
        {/* <Route path="/plans" element={<PlanCards />} /> */}
        {/* MySubscriptions route */}
        {/* <Route path="/subscriptions" element={<MySubscriptions />} />  */}

        {/* ManagePlan for admin route */}
        {/* <Route path="/manage-plan" element={<ManagePlan />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
