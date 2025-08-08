import { Dialog } from "@/components/ui/dialog";
import CadastroEntrada from "../colaboradores-portaria/cadastra";



export default function Nav() {
   return (
      <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
         <div className="absolute left-5">
            <Dialog>
               <CadastroEntrada />
            </Dialog>
         </div>
         <div>
            pesquisar
         </div>
      </nav>
   );
}