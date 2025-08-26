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

interface Funcionario {
  fun_chapa: string;
  fun_nome: string;
}

interface CadastroEntradaProps {
  onEntradaCadastrada: () => void;
}

export default function CadastroEntrada({ onEntradaCadastrada }: CadastroEntradaProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<Funcionario | null>(null);
  const [buscaColaborador, setBuscaColaborador] = useState("");
  const [tipo, setTipo] = useState("");
  const [horarioRegistrado, setHorarioRegistrado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Buscar funcionários sempre que a busca mudar
  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        if (!buscaColaborador.trim()) {
          setFuncionarios([]);
          return;
        }
        const response = await api.get(`/api/rhfuncionarios/?search=${buscaColaborador}`);
        const ativos = response.data.filter(f => f.fun_status === 'A'); // apenas ativos
      setFuncionarios(ativos);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    }
    fetchFuncionarios();
  }, [buscaColaborador]);

  const filteredFuncionarios = funcionarios.filter(f =>
    f.fun_nome.toLowerCase().includes(buscaColaborador.toLowerCase()) ||
    f.fun_chapa.includes(buscaColaborador)
  );

  const handleSelectColaborador = (f: Funcionario) => {
    setColaboradorSelecionado(f);
    setBuscaColaborador(f.fun_nome);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!colaboradorSelecionado) return alert("Selecione um colaborador.");
    if (!tipo) return alert("Selecione um tipo de registro.");
    if (!horarioRegistrado) return alert("Informe o horário de registro.");

    try {
      await api.post("/api/portariaColaborador/", {
        rh_func_chapa: colaboradorSelecionado.fun_chapa,
        motivo,
        tipo,
        horario_registrado: new Date(horarioRegistrado).toISOString(),
      });

      alert("Registro salvo com sucesso!");
      setColaboradorSelecionado(null);
      setBuscaColaborador("");
      setMotivo("");
      setTipo("");
      setHorarioRegistrado("");
      onEntradaCadastrada();
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error.response?.data || error);
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
                onChange={e => {
                  setBuscaColaborador(e.target.value);
                  setShowDropdown(true);
                  setColaboradorSelecionado(null); // resetar seleção anterior
                }}
                placeholder="Digite para buscar..."
                className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
              />
              {showDropdown && filteredFuncionarios.length > 0 && (
                <ul className="absolute z-10 bg-white dark:bg-gray-950 border w-full mt-1 max-h-40 overflow-auto rounded shadow">
                  {filteredFuncionarios.map(f => (
                    <li
                      key={f.fun_chapa}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                      onClick={() => handleSelectColaborador(f)}
                    >
                      {f.fun_nome} ({f.fun_chapa})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label>Motivo:</label>
            <Input
              type="text"
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />

            <label>Horário:</label>
            <Input
              type="datetime-local"
              value={horarioRegistrado}
              onChange={e => setHorarioRegistrado(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />

            <label>Tipo:</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            >
              <option value="">Selecione um tipo</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>

            <Button type="submit">Salvar</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
