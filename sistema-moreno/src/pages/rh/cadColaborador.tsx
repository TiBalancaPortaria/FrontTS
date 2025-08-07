import { ModeToggle } from "@/components/mode-toggle";
import { Dialog } from "@/components/ui/dialog";
import DialogRegistro from "./dialog-registro";
import ListaColaboradores from "./lista";

export default function CadColaborador() {
   return (
      <>
       <main className="bg-slate-300 dark:bg-gray-500 h-screen">
         <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
            <div className="absolute left-5">
               <ModeToggle />
            </div>
            <div>
               <h1 className="text-3xl font-bold text-red-600 ">Cadastro de Colaboradores</h1>
            </div>
            <div className="absolute right-5">
               <h1>Voltar</h1>
            </div>
         </nav>
         <div>
            <Dialog>
               <DialogRegistro />
            </Dialog>
         </div>
         <ListaColaboradores />
       </main>
      </>
   );
}