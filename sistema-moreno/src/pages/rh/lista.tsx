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
import EditarColaborador from "./dialog-editar";

interface Colaborador { // crio interface para tipar os colaboradores
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

export default function ListaColaboradores({ filter }: { filter: string }) {

  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const fetchColaboradores = async () => { // Função para buscar colaboradores
    try {
      const response = await api.get("/api/Colaborador/");
      setColaboradores(response.data); // Atualiza o estado com os colaboradores recebidos
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  async function handleDelete(id: number) {
    try {
      await api.delete(`/api/Colaborador/${id}`);
      setColaboradores((prev) => prev.filter((colab) => colab.id !== id));
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error);
    }
  }

  const filteredColaboradores = colaboradores.filter((colab) => // para filtrar por nomes
    colab.nome.toLowerCase().includes(filter.toLowerCase())
  );

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
          {filteredColaboradores.map((colab) => (
            <TableRow key={colab.id}>
              <TableCell>{colab.nome}</TableCell>
              <TableCell>{colab.cracha}</TableCell>
              <TableCell>{colab.setor}</TableCell>
              <TableCell>{colab.responsavel}</TableCell>
              <TableCell className="flex gap-2">
                <EditarColaborador
                  colaborador={colab}
                  onAtualizar={fetchColaboradores} // ✅ Aqui atualiza a lista após edição
                />
                <Button
                  className="text-red-500 hover:underline bg-white dark:bg-black"
                  onClick={() => handleDelete(colab.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
