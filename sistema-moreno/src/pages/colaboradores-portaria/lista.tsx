import { useEffect, useState } from "react";
import api from "@/axios/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Colaborador {
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

interface Entrada {
  id: number;
  colaborador: Colaborador | null;
  colaborador_id: number;
  motivo: string;
  data_entrada: string;
  data_saida: string | null;
}

export default function ListaDeEntradas() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  const fetchEntradas = async () => {
    try {
      const response = await api.get("/api/Port_Colaborador/");
      setEntradas(response.data);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

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
          {entradas.map((entrada) => (
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
                Ações
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
