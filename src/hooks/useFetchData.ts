import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useFetchData(endpoint: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async() => {
        try {
            setLoading(true);
            const response = await api.get(endpoint);
            setData(response.data)
        } catch (error: any) {
            setError(error.message || "Erro ao carregar os dados da api")
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, loading, error, refetch: fetchData };
}