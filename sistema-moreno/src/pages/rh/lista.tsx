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

interface Colaborador { // crio interface para tipar os colaboradores
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

export default function ListaColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]); // uso o useState para armazenar os colaboradores com tipagem Colaborador[]

  useEffect(() => {
    async function fetchColaboradores() {
      try {
        const response = await api.get("/api/Colaborador/");
        setColaboradores(response.data);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      }
    }

    fetchColaboradores();
  }, []);

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Crachá</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Setor</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Responsável</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradores.map((colab) => (
            <TableRow key={colab.id}>
              <TableCell>{colab.nome}</TableCell>
              <TableCell>{colab.cracha}</TableCell>
              <TableCell>{colab.setor}</TableCell>
              <TableCell>{colab.responsavel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
