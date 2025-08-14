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

interface Funcionario {
  fun_chapa: string;
  fun_nome: string;
}

export default function ListaColaboradores({ filter }: { filter: string }) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const fetchFuncionarios = async () => {
    try {
      const response = await api.get("/api/rhfuncionarios/");
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar Funcionarios:", error);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const filteredFuncionarios = funcionarios.filter((f) =>
    f.fun_nome.toLowerCase().includes(filter.toLowerCase())
  );

  const [itensVisiveis, setItensVisiveis] = useState(12);

  const loadMore = () => {
    setItensVisiveis((prev) => prev + 12);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const colaboradoresVisiveis = filteredFuncionarios.slice(0, itensVisiveis);

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Crachá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradoresVisiveis.map((funcionario) => (
            <TableRow key={funcionario.fun_chapa} className="hover:bg-gray-200 dark:hover:bg-gray-700">
              <TableCell className="text-gray-700 dark:text-gray-200">{funcionario.fun_nome}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-200">{funcionario.fun_chapa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {itensVisiveis < filteredFuncionarios.length && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore}>Carregar mais</Button>
        </div>
      )}
    </div>
  );
}
