
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
  onAtualizar: () => void;

}


export default function ListaDeEntradas({ entradas, onAtualizar }: ListaDeEntradasProps) {


const [itensVisiveis, setItensVisiveis] = useState(12);

const loadMore = () => {
  setItensVisiveis((prev) => prev + 12);
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, 100);
};


const entradasVisiveis = entradas.slice(0, itensVisiveis);

async function registrarSaida(id: number) {
  try {
    const response = await api.post(`/api/Port_Colaborador/${id}/registrar_saida/`);
    console.log("Saída registrada com sucesso:", response.data);
    alert("Saída registrada com sucesso!");
    // Aqui você pode atualizar a lista de entradas
    onAtualizar();

  } catch (error) {
    console.error("Erro ao registrar saída:", error);
    alert("Erro ao registrar saída");
  }
}


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
              Hora Entrada
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Hora Saída
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Motivo
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Ações
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
                {entrada.data_entrada
                  ? new Date(entrada.data_entrada).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.data_entrada
                  ? new Date(entrada.data_entrada).toLocaleTimeString()
                  : "—"}
              </TableCell>
               <TableCell>
                  {entrada.data_saida
                     ? new Date(entrada.data_saida).toLocaleTimeString()
                     : "—"}
               </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                {entrada.motivo}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300">
                <Button onClick={() => registrarSaida(entrada.id)}>
                  Registrar Saída
                </Button>
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
