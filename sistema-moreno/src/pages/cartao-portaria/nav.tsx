import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import CadEntrada from "./cadastro_entrada";



export default function Nav() {
   return (
      <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
         <div className="absolute left-5">
            <Dialog>
               <CadEntrada />
            </Dialog>
         </div>
         <div>
            pesquisar
         </div>
      </nav>
   );
}