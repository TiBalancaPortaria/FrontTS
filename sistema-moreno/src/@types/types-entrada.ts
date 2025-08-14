export interface Colaborador {
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

export interface Entrada {
  id: number;
  colaborador: Colaborador | null;
  motivo: string;
  horario_registrado: string;
  tipo: string;
}
