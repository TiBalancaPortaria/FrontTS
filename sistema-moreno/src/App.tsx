import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/login/login"
import Menu from "./pages/Menu";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
