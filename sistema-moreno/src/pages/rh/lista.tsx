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
import { Button } from "@/components/ui/button";

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

  async function handleDelete(id: number) {
    try {
      await api.delete(`/api/Colaborador/${id}`);
      setColaboradores(colaboradores.filter((colab) => colab.id !== id)); // atualizo o estado para remover o colaborador excluído
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error);
    }
  }

  

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Crachá</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Setor</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Responsável</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradores.map((colab) => (
            <TableRow key={colab.id}>
              <TableCell>{colab.nome}</TableCell>
              <TableCell>{colab.cracha}</TableCell>
              <TableCell>{colab.setor}</TableCell>
              <TableCell>{colab.responsavel}</TableCell>
              <TableCell className="flex gap-2">
                <Button className="text-blue-500 hover:underline"
                
                >Editar</Button>
                <Button className="text-red-500 hover:underline"
                onClick={() => handleDelete(colab.id)}
                >Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
