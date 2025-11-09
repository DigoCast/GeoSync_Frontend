import type { Cidade } from "./Cidade";

export interface Pais {
  id: number;
  nome: string;
  sigla: string;
  moeda: string;
  idiomaOficial: string;
  populacao: string;
  continenteId: number;
  cidades?: Cidade[];
}

export type PaisFormData = Omit<Pais, "id" | "cidades" | "sigla" | "moeda" | "idiomaOficial" | "populacao">;