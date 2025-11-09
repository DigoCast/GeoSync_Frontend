import { useState } from "react";
import DataTable from "../components/DataTable";
import { FilterBar } from "../components/FilterBar";
import SideModal from "../components/SideModal";
import { useFetchData } from "../hooks/useFetchData";
import { api } from "../services/api";
import type { Continente, ContinenteFormData } from "../types/Continente";
import ContinenteFormModal from "../components/ContinenteFormModal";
import toast from "react-hot-toast";

const Continente = () => {
  const { data: continentes, loading, error, refetch } = useFetchData("continente");
  const [selectedItem, setSelectedItem] = useState<Continente | null>(null)
  const [isOpenSideModal, setIsOpenSideModal] = useState(false);
  const [isOpenCenterModal, setIsOpenCenterModal] = useState(false);


  const handleRowClick = async (index: number) => {
    if(!continentes) return;
    const id = continentes[index].id;

    try {
      const response = await handleGetContinenteById(id);
      setSelectedItem(response?.data);
      setIsOpenSideModal(true);
    } catch (error) {
      console.log("Erro ao buscar continente", error)
    }
  }

  const handleSubmit = async (data: ContinenteFormData) => {
    try {
      const request = selectedItem
        ? api.put(`continente/${selectedItem.id}`, data)
        : api.post("continente", data);

      await toast.promise(
        request, {
          loading: selectedItem ? "Atualizando continente..." : "Criando continente...",
          success: selectedItem ? "Continente atualizado com sucesso!" : "Continente criado com sucesso!",
          error: "Erro ao salvar continente.",
        }
      );

      refetch();
      setIsOpenCenterModal(false);
    } catch (error) {
      console.error("Erro ao salvar continente:", error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const request = api.delete(`continente/${id}`);
      
      await toast.promise(
        request, {
          loading:  "Deletando continente...",
          success: "Continente deletado com sucesso!",
          error: "Erro ao deletar continente.",
        }
      )

      refetch();
    } catch (error) {
      console.error("Erro ao deletar continente", error);
    }
  };

  const handleGetContinenteById = async (id: number) => {
    try {
      const continenteSelecionado = await api.get(`continente/${id}`);
      return continenteSelecionado;
    } catch (error) {
      console.log("erro ao encontrar continente", error);
    }
  }

  const columns = ["Nome", "Descrição", "Ações"];
  const rows = continentes?.map((conti) => [conti.nome, conti.descricao, <Actions continente={conti} onEdit={(cont) => {setSelectedItem(cont); setIsOpenCenterModal(true);}} onDelete={handleDelete} />]) || [];

  return (
    <div className="w-full">
      <div className="p-7 flex flex-col border-b border-border space-y-3">
        <div className="flex items-center space-x-4">
          <i className="fa-solid fa-earth-americas fa-2xl"></i>
          <h1 className="text-text-primary font-semibold text-4xl">Continentes</h1>
        </div>
        <p className='text-text-secondary'>Gerencie, adicione e visualize informações sobre continentes cadastrados</p>
      </div>

      <div className="p-5">
        <FilterBar
          searchPlaceholder="Buscar continente..."
          onAdd={() => {
            setSelectedItem(null);
            setIsOpenCenterModal(true)
          }}
          addLabel="Novo Continente"
        />
        <div className="flex w-full py-5 items-center justify-center">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <DataTable columns={columns} rows={rows} onRowClick={handleRowClick} />}
        </div>
      </div>

      <SideModal isOpen={isOpenSideModal} onClose={() => setIsOpenSideModal(false)} title={`Detalhes do Continente ${selectedItem?.nome}`}>
        {selectedItem && (
          <div className="space-y-2">
            <p><strong>Nome:</strong> {selectedItem.nome}</p>
            <p><strong>Descrição:</strong> {selectedItem.descricao}</p>

            <div className="mt-5">
              <h3 className="font-semibold text-lg mb-2">Paises:</h3>
              {selectedItem.paises && selectedItem.paises.length > 0 ? (
                <div className="max-h-60 overflow-y-auto rounded-md border border-border">
                  <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 bg-surface z-10">
                      <tr className="text-left border-b border-border">
                        <th className="p-2 font-medium">Nome</th>
                        <th className="p-2 font-medium">Idioma</th>
                        <th className="p-2 font-medium">Moeda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.paises.map((pais) => (
                        <tr key={pais.id} className="border-t border-border hover:bg-hover transition">
                          <td className="p-2">{pais.nome}</td>
                          <td className="p-2">{pais.idiomaOficial}</td>
                          <td className="p-2">{pais.moeda}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-text-secondary">Nenhum país cadastrado</p>
              )}
            </div>
          </div>
        )}
      </SideModal>

      <ContinenteFormModal
        isOpen={isOpenCenterModal}
        onClose={() => setIsOpenCenterModal(false)}
        continente={selectedItem || undefined}
        onSubmit={handleSubmit}
      />

    </div>
  )
}

const Actions = ({
  continente,
  onEdit,
  onDelete,
}: {
  continente: Continente;
  onEdit: (continente: Continente) => void;
  onDelete: (id: number) => void;
}) => (
  <div className="flex gap-3 text-primary">
    <i
      className="fa-solid fa-pen cursor-pointer hover:text-primary-hover"
      onClick={(e) => {
        e.stopPropagation();
        onEdit(continente);
      }}
    ></i>
    <i
      className="fa-solid fa-trash cursor-pointer text-red-500 hover:text-red-400"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(continente.id);
      }}
    ></i>
  </div>
);

export default Continente;