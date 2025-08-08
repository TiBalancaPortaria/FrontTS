import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/axios/api";

type Colaborador = {
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
};

export default function EditarColaborador({
  colaborador,
  onAtualizar,
}: {
  colaborador: Colaborador;
  onAtualizar?: () => void;
}) {
  const [open, setOpen] = useState(false); // controla o dialog
  const [formData, setFormData] = useState({
    setor: colaborador.setor,
    responsavel: colaborador.responsavel,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/api/Colaborador/${colaborador.id}/`, {
        ...colaborador,
        ...formData,
      });
      alert("Colaborador atualizado com sucesso!");
      onAtualizar?.();
      setOpen(false); // Fecha o Dialog após salvar
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar colaborador.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="bg-white text-black hover:underline dark:bg-black dark:text-white hover:bg-gray-200">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Colaborador</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label className="text-sm">Setor:</label>
          <Input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
          />
          <label className="text-sm">Responsável:</label>
          <Input
            type="text"
            name="responsavel"
            value={formData.responsavel}
            onChange={handleChange}
          />
          <Button type="submit" className="bg-red-600 text-white mt-4">
            Salvar Alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
