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
  colaborador_id: number;
  motivo: string;
  data_entrada: string;
  data_saida: string | null;
}
