import { useEffect, useState } from "react";
import type { ContinenteType, ContinenteFormData } from "../types/ContinenteType";
import CenterModal from "./CenterModal";
import toast from "react-hot-toast";

interface ContinenteFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ContinenteFormData) => void;
    continente?: ContinenteType;
}

const ContinenteFormModal = ({isOpen, onClose, onSubmit, continente}: ContinenteFormModalProps) => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if(continente) {
            setNome(continente.nome);
            setDescricao(continente.descricao);
        } else {
            setNome("");
            setDescricao("");
        }
    }, [continente]);

    const handleSubmit = () => {
        if (!nome.trim() || !descricao.trim()) {
            toast.error("Preencha todos os campos antes de salvar.");
            return;
        }
        onSubmit({nome, descricao})
        onClose();
    }

    return (
        <CenterModal isOpen={isOpen} onClose={onClose} title={continente ? "Editar Continente" : "Novo Continente"}>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition" />
                </div>

                <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-lg hover:gradient-dynamic cursor-pointer">
                    {continente? "Salvar": "Criar"}
                </button>
            </div>
        </CenterModal>
    )
}

export default ContinenteFormModal;