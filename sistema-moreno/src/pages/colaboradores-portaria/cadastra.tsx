import { useEffect, useState } from "react";
import api from "@/axios/api";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Colaborador {
  id: number;
  nome: string;
}

interface CadastroEntradaProps {
  onEntradaCadastrada: () => void;
}

export default function CadastroEntrada({ onEntradaCadastrada }: CadastroEntradaProps) {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [colaboradorIdSelecionado, setColaboradorIdSelecionado] = useState<number | null>(null);
  const [buscaColaborador, setBuscaColaborador] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [motivo, setMotivo] = useState("");

  // Buscar colaboradores
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

  const colaboradoresFiltrados = colaboradores.filter((colab) =>
    colab.nome.toLowerCase().includes(buscaColaborador.toLowerCase())
  );

  const handleSelectColaborador = (colab: Colaborador) => {
    setColaboradorIdSelecionado(colab.id);
    setBuscaColaborador(colab.nome);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colaboradorIdSelecionado) {
      alert("Selecione um colaborador.");
      return;
    }
    try {
      const dataEntradaISO = dataEntrada ? new Date(dataEntrada).toISOString() : new Date().toISOString();
      await api.post("/api/Port_Colaborador/", {
        colaborador_id: colaboradorIdSelecionado,
        motivo: motivo,
        data_entrada: dataEntradaISO,
      });
      alert("Entrada cadastrada com sucesso!");
      setColaboradorIdSelecionado(null);
      setBuscaColaborador("");
      setMotivo("");
      setDataEntrada("");
      onEntradaCadastrada();
    } catch (error) {
      console.error("Erro ao cadastrar entrada:", error);
      alert("Erro ao cadastrar entrada.");
    }
  };

  return (
    <>
      <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
        Cadastrar Entrada
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Entrada</DialogTitle>
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <label>Nome:</label>
            <div className="relative">
              <Input
                type="text"
                value={buscaColaborador}
                onChange={(e) => setBuscaColaborador(e.target.value)}
                placeholder="Digite para buscar..."
                className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
                required
              />
              {buscaColaborador && colaboradoresFiltrados.length > 0 && (
                <ul className="absolute z-10 bg-white dark:bg-gray-950 border w-full mt-1 max-h-40 overflow-auto rounded shadow">
                  {colaboradoresFiltrados.map((colab) => (
                    <li
                      key={colab.id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                      onClick={() => handleSelectColaborador(colab)}
                    >
                      {colab.nome}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label>Motivo:</label>
            <Input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />
            <label>Entrada:</label>
            <Input
              type="datetime-local"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />

            <Button type="submit">Salvar</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
