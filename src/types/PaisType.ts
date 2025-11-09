import type { CidadeType } from "./CidadeType";

export interface PaisType {
  id: number;
  nome: string;
  sigla: string;
  moeda: string;
  idiomaOficial: string;
  populacao: string;
  continenteId: number;
  cidades?: CidadeType[];
}

export type PaisFormData = Omit<PaisType, "id" | "cidades" | "sigla" | "moeda" | "idiomaOficial" | "populacao">;