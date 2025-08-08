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

export default function CadastroEntrada() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [colaboradorIdSelecionado, setColaboradorIdSelecionado] = useState("");
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

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!colaboradorIdSelecionado) {
      alert("Selecione um colaborador.");
      return;
    }

    try {
      const response = await api.post("/api/Port_Colaborador/", {
         colaborador_id: colaboradorIdSelecionado,
         motivo: motivo,
         data_entrada: new Date().toISOString(), // Usando a data atual
      });
      console.log("Entrada cadastrada:", response.data);
      alert("Entrada cadastrada com sucesso!");
      setColaboradorIdSelecionado("");
      setMotivo("");
      setDataEntrada("");
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
            <select
               className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
              value={colaboradorIdSelecionado}
              onChange={(e) => setColaboradorIdSelecionado(e.target.value)}
              required
            >
              <option value="">Selecione um colaborador</option>
              {colaboradores.map((colab) => (
                <option key={colab.id} value={colab.id}>
                  {colab.nome}
                </option>
              ))}
            </select>

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
