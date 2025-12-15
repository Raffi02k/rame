import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_page";
import AdminPage from "./pages/admin/AdminPage";
import BrukarePage from "./pages/user/BrukarePage";
import PersonalPage from "./pages/staff/PersonalPage";

export default function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/brukare" element={<BrukarePage />} />
        </Routes>
       </BrowserRouter> 
    )
}