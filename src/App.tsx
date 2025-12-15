import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_page";
import AdminPage from "./pages/admin_page";
import BrukarePage from "./pages/brukare_page";
import PersonalPage from "./pages/personal_page";

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