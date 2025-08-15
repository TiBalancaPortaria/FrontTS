import { ModeToggle } from "@/components/mode-toggle";
import Nav from "./nav";
import ListaDeEntradas from "./lista";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import type { Entrada } from "@/@types/types-entrada";


export const ColaboradoresPortaria = () => {

   const [entradas, setEntradas] = useState<Entrada[]>([]);
   const [filtro, setFiltro] = useState("");


   const fetchEntradas = async () => {
      try{
         const response = await api.get("/api/portariaColaborador/");
         setEntradas(response.data);
      } catch (error) {
         console.error("Erro ao buscar entradas:", error);
      }
   }

   useEffect(() => {
      fetchEntradas();
   }, []);

   return (
      <main className="bg-gray-300 dark:bg-slate-600 min-h-screen">
         <header className="relative flex items-center justify-center h-16 bg-gray-400 dark:bg-slate-800">
            <div className="absolute left-2"><ModeToggle /></div>
            <h1 className="text-3xl font-extrabold text-red-600">Entrada Colaboradores</h1>
         </header>
         <Nav filtro={filtro} setFiltro={setFiltro} onEntradaCadastrada={fetchEntradas} />
         <ListaDeEntradas entradas={entradas.filter(
            entrada => entrada.colaborador?.nome.toLowerCase().includes(filtro.toLowerCase()))} 
         onAtualizar={fetchEntradas} />
      </main>
   );
}