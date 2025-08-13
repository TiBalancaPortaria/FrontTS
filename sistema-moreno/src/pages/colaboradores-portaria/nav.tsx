import { Dialog } from "@/components/ui/dialog";
import CadastroEntrada from "./cadastra";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavProps {
   onEntradaCadastrada: () => void;
   filtro: string;
   setFiltro: (filtro: string) => void;
}

const handleVoltar = () => {
   
   window.history.back();
};


export default function Nav({onEntradaCadastrada, filtro, setFiltro}: NavProps) {


   return (
      <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
         <div className="absolute left-5">
            <Dialog>
               <CadastroEntrada onEntradaCadastrada={onEntradaCadastrada} />
            </Dialog>
         </div>
         <div>
            <Input placeholder="Pesquisar entradas..." className="w-96" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
         </div>
         <div className="absolute right-5">
            <Button className="bg-white text-dark dark:bg-black dark:text-white" onClick={handleVoltar}>Voltar</Button>
         </div>
      </nav>
   );
}