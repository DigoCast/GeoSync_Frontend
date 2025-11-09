import type { Pais } from "./Pais"

export interface Continente{
    id: number,
    nome: string,
    descricao: string
    paises?: Pais[];
}

export type ContinenteFormData = Omit<Continente, "id" | "paises">;