import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function CadEntrada(){
   return (
      <>
         <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
            Cadastrar Entrada
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Cadastrar Entrada</DialogTitle>
               <DialogDescription>
               This action cannot be undone. This will permanently delete your account
               and remove your data from our servers.
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </>
   );
}