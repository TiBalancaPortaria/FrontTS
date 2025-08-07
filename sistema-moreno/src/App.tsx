import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/login/login"
import Menu from "./pages/Menu";
import { CartaoPortaria } from "./pages/cartao-portaria";
import CadColaborador from "./pages/rh/cadColaborador";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/Portaria/CartaoPortaria" element={<CartaoPortaria />} />
          <Route path="/rh/CadColaboradores" element={<CadColaborador />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
