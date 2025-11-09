import { useEffect, useState } from "react";
import type { CidadeType, CidadeFormData } from "../types/CidadeType";
import type { PaisType } from "../types/PaisType";
import { api } from "../services/api";
import toast from "react-hot-toast";
import CenterModal from "./CenterModal";

interface CidadeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CidadeFormData) => void;
    cidade?: CidadeType;
}

const CidadeFormModal = ({isOpen, onClose, onSubmit, cidade}: CidadeFormModalProps) => {
    const [ nome, setNome ] = useState("");
    const [populacao, setPopulacao] = useState<string>("");
    const [ paises, setPaises ] = useState<PaisType[]>([]);
    const [ paisId, setPaisId] = useState<string>("");
    const [ loadingPaises, setLoadingPaises ] = useState(false);

    useEffect( () => {
        if (!isOpen) return;

        let mounted = true;
        const fetchPaises = async () => {
            try {
                setLoadingPaises(true);
                const response = await api.get("pais");
                if(mounted) setPaises(response.data || []);
            } catch (error) {
                console.log("Erro ao carregar paises", error);
            } finally {
                if(mounted) setLoadingPaises(false);
            }
        }

        fetchPaises();
        return () => {
            mounted = false;
        };
    }, [isOpen]);

    useEffect(() => {
        if(cidade) {
            setNome(cidade.nome ?? "");
            setPopulacao(String(cidade.populacao ?? ""))
            setPaisId(cidade.paisId ? String(cidade.paisId) : "");
        }else {
            setNome("")
            setPopulacao("")
            setPaisId("")
        }
    }, [cidade, isOpen]);

    const handleSubmit = () => {
        const populacaoNumber = Number(populacao);
        if(!nome.trim()) {
            toast.error("Informe o nome da cidade.")
            return
        }
        if(!populacao.trim() || isNaN(populacaoNumber) || populacaoNumber <= 0) {
            toast.error("Informe a população da cidade.");
            return;
        }
        if (!paisId) {
            toast.error("Selecione um país.");
            return;
        }

        const payload: CidadeFormData = {
            nome: nome.trim(),
            populacao: populacaoNumber,
            paisId: Number(paisId)
        }
        onSubmit(payload);
    };

    return (
        <CenterModal isOpen={isOpen} onClose={onClose} title={cidade ? "Editar País" : "Novo País"} >
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">População</label>
                    <input type="number"
                        value={populacao}
                        onChange={(e) => setPopulacao(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">País</label>
                    <select value={paisId} onChange={(e) => setPaisId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer" >
                        <option value="" className="cursor-pointer">Selecione um país</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={String(pais.id)} className="cursor-pointer">
                                {pais.nome}
                            </option>
                        ))}
                    </select>
                    {loadingPaises && <p className="text-sm text-text-secondary mt-1">Carregando países...</p>}
                </div>
                <button onClick={handleSubmit} className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:gradient-dynamic cursor-pointer">
                    {cidade ? "Salvar": "Criar"}
                </button>
            </div>
        </CenterModal>
    )
}

export default CidadeFormModal