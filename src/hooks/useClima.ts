import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Clima } from "../types/Clima";

export function useClima(idCidade: number | null) {
    const [clima, setClima] = useState<Clima | null>(null);
    const [loadingClima, setLoadingClima] = useState(false);
    const [errorClima, setError] = useState<string | null>(null);
    const fetchClima = async () => {
        setLoadingClima(true);
        setError(null);
        try {
            const response = await api.get(`cidade/${idCidade}/clima`);
            setClima(response.data);
        } catch {
            setError("Erro ao buscar o clima da cidade");
            setClima(null);
        } finally {
            setLoadingClima(false);
        }
    };

    useEffect(() => {
        if (!idCidade) return;
        fetchClima();
    }, [idCidade]);

  return { clima, loadingClima, errorClima, refetchClima: fetchClima };
}
