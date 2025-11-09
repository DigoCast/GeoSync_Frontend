import type { PaisType } from "./PaisType"

export interface ContinenteType {
    id: number,
    nome: string,
    descricao: string
    paises?: PaisType[];
}

export type ContinenteFormData = Omit<ContinenteType, "id" | "paises">;