import { FilterBar } from '../components/FilterBar'
import { useFetchData } from '../hooks/useFetchData'
import DataTable from '../components/DataTable';
import { api } from '../services/api';
import { useEffect, useState } from 'react';
import type { CidadeType, CidadeFormData } from '../types/CidadeType';
import toast from 'react-hot-toast';
import SideModal from '../components/SideModal';
import CidadeFormModal from '../components/CidadeFormModal';
import { useClima } from '../hooks/useClima';
import ClimaCard from '../components/ClimaCard';

const Cidade = () => {
  const { data: cidades, loading, error, refetch } = useFetchData("cidade");
  const [selectedItem, setSelectedItem] = useState<CidadeType | null>(null)
  const [ isOpenSideModal, setIsOpenSideModal] = useState(false);
  const [ isOpenCenterModal, setIsOpenCenterModal ] = useState(false);
  const { clima , loadingClima, errorClima, refetchClima } = useClima(selectedItem?.id || null)
  const [ search, setSearch ] = useState("");
  const [ filteredData, setFilteredData ] = useState<CidadeType[]>([])

  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(cidades || [])
      return
    }
    
    const delay = setTimeout(() => {
      const fetchFiltered = async () => {
        const response = await api.get(`cidade?nome=${search}`)
        setFilteredData(response.data)
      }
      fetchFiltered()
    }, 500)

    return () => clearTimeout(delay)
  }, [search, cidades])

  const handleRowClick = async (index: number) => {
    if(!cidades) return;
    const id = filteredData[index].id;
    
    try {
      const response = await handleGetCidadeById(id);

      setSelectedItem(response?.data)
      setIsOpenSideModal(true)
    } catch (error) {
      console.log("Erro ao buscar continente", error)
    }
  }

  const handleGetCidadeById = async (id: number) => {
    try {
      const cidade = await api.get(`cidade/${id}`)
      return cidade;
    } catch (error) {
      console.log("erro ao encontrar cidade", error)
    }
  }

  const handleSubmit = async (data : CidadeFormData) => {
    try {
      const request = selectedItem
      ? api.put(`cidade/${selectedItem.id}`, data)
      : api.post("cidade", data)

      await toast.promise(request, {
        loading: selectedItem ? "Atualizando cidade..." : "Criando cidade...",
        success: selectedItem ? "Cidade atualizada com sucesso!" : "Cidade criada com sucesso!",
        error: "Erro ao salvar cidade.",
      });
      refetch();
      setIsOpenCenterModal(false)
    } catch (error) {
      
    }
  }
  
  const handleDelete = async (id: number) => {
    try {
      const request = api.delete(`cidade/${id}`);
      await toast.promise(request, {
        loading:  "Deletando cidade...",
        success: "Cidade deletada com sucesso!",
        error: "Erro ao deletar cidade.",
      });
      refetch()
    } catch (error) {
      console.log("erro ao excluir cidade", error)
    }
  }

  const columns = ["Nome", "População", "Lat", "Lon", "Ações"]
  const rows = filteredData?.map((cid) => [cid.nome, cid.populacao, cid.latitude, cid.longitude, <Actions cidade={cid} onEdit={(c) => {setSelectedItem(c); setIsOpenCenterModal(true)}} onDelete={handleDelete} />])
  return (
    <div className="w-full">
        <div className="p-7 flex flex-col border-b border-border space-y-3">
            <div className='flex items-center space-x-4'>
                <i className='fa-solid fa-city fa-2xl'></i>
                <h1 className="text-text-primary font-semibold text-4xl">Cidades</h1>
            </div>
            <p className='text-text-secondary'>Gerencie, adicione e visualize informações sobre cidades cadastradas</p>
        </div>

        <div className="p-5">
          <FilterBar
              searchPlaceholder="Buscar cidade..."
              onSearchChange={(value) => setSearch(value)}
              onAdd={() => {
                setSelectedItem(null);
                setIsOpenCenterModal(true);
              }}
              addLabel="Nova Cidade"
          />
          <div className="flex w-full py-5 items-center justify-center">
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <DataTable columns={columns} rows={rows} onRowClick={handleRowClick}/>}
          </div>
        </div>

        <SideModal isOpen={isOpenSideModal} onClose={() => setIsOpenSideModal(false)} title={`Detalhes da Cidade ${selectedItem?.nome}`}>
          {selectedItem && (
            <div className='space-y-2'>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">Clima Atual</h2>
                <button
                  onClick={async () => {
                    toast.promise(refetchClima(), {
                      loading: "Atualizando clima...",
                      success: "Clima atualizado!",
                      error: "Erro ao atualizar clima."
                    });
                  }}
                  className="px-3 py-1 text-sm rounded-md bg-primary text-white hover:gradient-dynamic cursor-pointer"
                >
                  Atualizar
                </button>
              </div>
              {loadingClima && <p>Carregando clima...</p> }
              {errorClima && <p className="text-red-500">{errorClima}</p>}
              {clima && (
                <ClimaCard icone_url={clima.icone_url} descricao={clima.descricao} temperatura_c={String(clima.temperatura_c)} localidade={clima.localidade} hora_local={clima.hora_local} umidade_perc={String(clima.umidade_perc)} vento_kph={String(clima.vento_kph)} sensacao_termica_c={String(clima.sensacao_termica_c)}/>
              )}
              <hr className="my-4 border-border" />
              <p><strong>Nome:</strong> {selectedItem.nome}</p>
              <p><strong>População:</strong> {selectedItem.populacao}</p>
              <p><strong>Latitude:</strong> {selectedItem.latitude}</p>
              <p><strong>Longitude:</strong> {selectedItem.longitude}</p>
            </div>
          )}
        </SideModal>

        <CidadeFormModal 
          isOpen={isOpenCenterModal}
          onClose={() => setIsOpenCenterModal(false)}
          cidade={selectedItem || undefined}
          onSubmit={handleSubmit}
        />
    </div>
  )
}

const Actions = ({ cidade, onEdit, onDelete }: { cidade: CidadeType; onEdit: (cidade: CidadeType) => void ; onDelete: (id: number) => void }) => (
  <div className="flex gap-3 text-primary">
    <i className="fa-solid fa-pen cursor-pointer hover:text-primary-hover"
      onClick={(e) => {e.stopPropagation(); onEdit(cidade)}}></i>
    <i
      className="fa-solid fa-trash cursor-pointer text-red-500 hover:text-red-400"
      onClick={(e) =>{ e.stopPropagation(); onDelete(cidade.id) }}
    ></i>
  </div>
);

export default Cidade