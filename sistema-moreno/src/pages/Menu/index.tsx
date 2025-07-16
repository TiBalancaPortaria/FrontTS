import { ModeToggle } from "@/components/mode-toggle";
// import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Helmet } from "react-helmet-async";
// import { NavLink } from "react-router-dom";
import logoMoreno from "@/assets/logo_moreno.png";
import Barra_Menu from "./barra_menu";
  export function Menu() {
    
  
    return (
      <>
        <Helmet>
          <title>Sistema Moreno</title>
        </Helmet>
        
        <header className="bg-slate-400 dark:bg-gray-700 pl-2 pt-2 h-screen ">
          <ModeToggle />
          <nav className="flex flex-col items-center">
            <section>
            <img src={logoMoreno} alt="" className="w-[40rem]"/>
              <Barra_Menu />
            </section>
          </nav>
        </header>
      </>
    );
  }
  
  export default Menu;
  