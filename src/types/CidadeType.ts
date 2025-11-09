export interface CidadeType {
  id: number;
  nome: string;
  populacao: number;
  latitude: string;
  longitude: string;
  paisId: number;
}

export type CidadeFormData = Omit<CidadeType, "id" | "latitude" | "longitude">