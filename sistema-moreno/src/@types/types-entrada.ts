export interface Colaborador {
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

export interface Entrada {
  id: number;
  rh_func_chapa: string;
  colaborador: {
    nome: string;
  } | null;
  motivo: string;
  horario_registrado: string;
  tipo: string;
  data_registro: string;
}

