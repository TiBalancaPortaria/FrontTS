import { useEffect, useState } from "react";
import api from "@/axios/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseISO, format } from "date-fns";
import { ModeToggle } from "@/components/mode-toggle";
import * as XLSX from "xlsx";

interface Colaborador {
  id: number;
  nome: string;
}

interface Entrada {
  id: number;
  rh_func_chapa: string;
  colaborador: Colaborador;
  horario_registrado: string;
  data_registro: string;
  tipo: string;
  motivo: string;
}

export default function ConsultaEntradas() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [buscaNome, setBuscaNome] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  // Buscar entradas do backend
  const fetchEntradas = async () => {
    try {
      const response = await api.get("/api/portariaColaborador/");
      setEntradas(response.data);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

  // Filtrando por nome e data
  const entradasFiltradas = entradas.filter((entrada) => {
    const nomeMatch = entrada.colaborador?.nome
      .toLowerCase()
      .includes(buscaNome.toLowerCase());

    const dataMatch = dataFiltro
      ? format(parseISO(entrada.horario_registrado), "yyyy-MM-dd") === dataFiltro
    : true;

    return nomeMatch && dataMatch;
  });


  const handleVoltar = () => {
      window.history.back();
  };

  const exportarExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    entradasFiltradas.map((e) => ({
      Crachá: e.rh_func_chapa,
      Nome: e.colaborador?.nome ?? "Desconhecido",
      Motivo: e.motivo,
      Tipo: e.tipo,
      Data: e.horario_registrado
        ? format(parseISO(e.horario_registrado), "dd/MM/yyyy")
        : "—",
      Hora: e.horario_registrado
        ? format(parseISO(e.horario_registrado), "HH:mm")
        : "—",
      "Data Registro": e.data_registro
        ? format(parseISO(e.data_registro), "dd/MM/yyyy HH:mm")
        : "—",
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Entradas");
  XLSX.writeFile(workbook, "entradas.xlsx");
};

  return (
    <div className=" bg-slate-300 dark:bg-gray-800">
      <nav className="flex justify-center items-center p-4 bg-gray-200 dark:bg-gray-700 relative">
         <h1 className="text-4xl font-bold mb-4 text-red-500">Consulta de Entradas</h1>
         <div className="absolute left-5">
            <ModeToggle />
         </div>
         <div className="absolute right-5">
            <Button variant="outline" onClick={handleVoltar} >Voltar</Button>
         </div>
      </nav>

      <div className="flex gap-4 mb-6 p-5">
        <Input
          type="text"
          placeholder="Buscar por nome..."
          value={buscaNome}
          onChange={(e) => setBuscaNome(e.target.value)}
          className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
        />
        <Input
          type="date"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
          className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950 w-1/2"
        />
        <Button onClick={fetchEntradas}>Atualizar</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Crachá</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Colaborador</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Data</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Hora</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Data do Registro</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Tipo</TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">Motivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entradasFiltradas.map((entrada) => (
            
            <TableRow key={entrada.id}>
              <TableCell>{entrada.rh_func_chapa}</TableCell>
              <TableCell>{entrada.colaborador?.nome ?? "Desconhecido"}</TableCell>

              {/* Horário escolhido pelo usuário */}
              <TableCell>
                {entrada.horario_registrado
                  ? format(parseISO(entrada.horario_registrado), "dd/MM/yyyy")
                  : "—"}
              </TableCell>
              <TableCell>
                {entrada.horario_registrado
                  ? format(parseISO(entrada.horario_registrado), "HH:mm")
                  : "—"}
              </TableCell>

              {/* Data de registro no banco */}
              <TableCell>
                {entrada.data_registro
                  ? format(parseISO(entrada.data_registro), "dd/MM/yyyy HH:mm")
                  : "—"}
              </TableCell>

              <TableCell>{entrada.tipo}</TableCell>
              <TableCell>{entrada.motivo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={exportarExcel} className="mt-4">
        Exportar para Excel
      </Button>
      
    </div>
  );
}
