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
        <nav className="flex flex-row justify-between items-center h-screen bg-slate-400 dark:bg-gray-700">
          <section className="w-1/2 flex flex-col gap-[5rem] mt-40 h-screen items-center">
            <div className="flex items-center gap-20 flex-row justify-around">
              <h1 className="text-3xl font-bold text-red-800 dark:text-red-600">
                Sistema Moreno
              </h1>
              <ModeToggle />
            </div>
            <Barra_Menu />
          </section>
          <aside className="w-1/2">
            <img src={logoMoreno} alt="" />
          </aside>
        </nav>
      </>
    );
  }
  
  export default Menu;
  