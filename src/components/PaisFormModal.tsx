import { useEffect, useState } from "react";
import type { PaisType, PaisFormData } from "../types/PaisType";
import type { ContinenteType } from "../types/ContinenteType";
import { api } from "../services/api";
import CenterModal from "./CenterModal";
import toast from "react-hot-toast";

interface PaisFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PaisFormData) => void
    pais?: PaisType;
}

const PaisFormModal = ({isOpen, onClose, onSubmit, pais}: PaisFormModalProps) => {
    const [nome, setNome] = useState("");
    const [continentes, setContinentes] = useState<ContinenteType[]>([]);
    const [continenteId, setContinenteId] = useState<string>(""); 
    const [loadingContinentes, setLoadingContinentes] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        let mounted = true;
        const fetchContinentes = async () => {
            try {
                setLoadingContinentes(true);
                const response = await api.get("continente");
                if (mounted) setContinentes(response.data || []);
            } catch (error) {
                console.error("Erro ao carregar continentes:", error);
            } finally {
                if (mounted) setLoadingContinentes(false);
            }
        };

        fetchContinentes();
        return () => {
            mounted = false;
        };
    }, [isOpen]);

    useEffect(() => {
        if (pais) {
            setNome(pais.nome ?? "");
            setContinenteId(pais.continenteId ? String(pais.continenteId) : "");
        } else {
            setNome("");
            setContinenteId("");
        }
    }, [pais, isOpen]);

    const handleSubmit = () => {
        if (!nome.trim()) {
            toast.error("Informe o nome do país.");
            return;
        }
        if (!continenteId) {
            toast.error("Selecione um continente.");
            return;
        }

        const payload: PaisFormData = {
            nome: nome.trim(),
            continenteId: Number(continenteId), 
        };
        onSubmit(payload);
    };

 
    return (
        <CenterModal isOpen={isOpen} onClose={onClose} title={pais ? "Editar País" : "Novo País"} >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Continente</label>
                    <select value={continenteId} onChange={(e) => setContinenteId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer" >
                        <option value="" className="cursor-pointer">Selecione um continente</option>
                        {continentes.map((cont) => (
                            <option key={cont.id} value={String(cont.id)} className="cursor-pointer">
                                {cont.nome}
                            </option>
                        ))}
                    </select>
                    {loadingContinentes && <p className="text-sm text-text-secondary mt-1">Carregando continentes...</p>}
                </div>
                <button onClick={handleSubmit} className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:gradient-dynamic cursor-pointer">
                    {pais? "Salvar": "Criar"}
                </button>
            </div>
        </CenterModal>
    );
}

export default PaisFormModal;