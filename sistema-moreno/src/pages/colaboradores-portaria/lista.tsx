
import type { Entrada } from "@/@types/types-entrada";
import api from "@/axios/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";


interface ListaDeEntradasProps {
  entradas: Entrada[];

}


export default function ListaDeEntradas({ entradas}: ListaDeEntradasProps) {


const [itensVisiveis, setItensVisiveis] = useState(12);

const loadMore = () => {
  setItensVisiveis((prev) => prev + 12);
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, 100);
};


const entradasVisiveis = entradas.slice(0, itensVisiveis);




  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Colaborador
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Data
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Hora
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Tipo
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Motivo
            </TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {entradasVisiveis.map((entrada) => (
            <TableRow key={entrada.id}>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.colaborador?.nome ?? "Desconhecido"}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.horario_registrado
                  ? new Date(entrada.horario_registrado).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.horario_registrado
                  ? new Date(entrada.horario_registrado).toLocaleTimeString()
                  : "—"}
              </TableCell>
               <TableCell>
                  {entrada.tipo ?? "-"}
               </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.motivo}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {itensVisiveis < entradas.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
    
  );
}
