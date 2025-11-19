import { FilterBar } from '../components/FilterBar'
import { useFetchData } from '../hooks/useFetchData'
import DataTable from '../components/DataTable'
import { api } from '../services/api'
import { useEffect, useState } from 'react'
import type { PaisType, PaisFormData } from '../types/PaisType'
import toast from 'react-hot-toast'
import SideModal from '../components/SideModal'
import PaisFormModal from '../components/PaisFormModal'
import type { ContinenteType } from '../types/ContinenteType'

const Pais = () => {
  const { data: paises, loading, error, refetch} = useFetchData("pais")
  const { data: continentes } = useFetchData("continente")
  const [ selectedItem, setSelectedItem ] = useState<PaisType | null>(null)
  const [ isOpenSideModal, setIsOpenSideModal] = useState(false)
  const [ isOpenCenterModal, setIsOpenCenterModal ] = useState(false)
  const [ search, setSearch ] = useState("");
  const [ filteredData, setFilteredData ] = useState<PaisType[]>([])

  const [ continenteIdFilter, setContinenteIdFilter ] = useState("");
  const [ populacaoMinFilter, setPopulacaoMinFilter ] = useState("");
  const [ populacaoMaxFilter, setPopulacaoMaxFilter ] = useState("");

  useEffect(() => {
    if (!search.trim() && !continenteIdFilter && !populacaoMinFilter && !populacaoMaxFilter) {
      setFilteredData(paises || [])
      return
    }

    const delay = setTimeout(() => {
      const fetchFiltered = async () => {
        const queryParams = new URLSearchParams();
        if (search.trim()) queryParams.append('nome', search.trim());
        if (continenteIdFilter) queryParams.append('continenteId', continenteIdFilter);
        if (populacaoMinFilter) queryParams.append('populacaoMin', populacaoMinFilter);
        if (populacaoMaxFilter) queryParams.append('populacaoMax', populacaoMaxFilter);

        try {
            const response = await api.get(`pais?${queryParams.toString()}`)
            setFilteredData(response.data)
        } catch (error) {
            console.error("Erro ao buscar dados filtrados:", error);
            setFilteredData([]);
        }
      }
      fetchFiltered()
    }, 500)

    return () => clearTimeout(delay)
  }, [search, paises, continenteIdFilter, populacaoMinFilter, populacaoMaxFilter])

  const handleRowClick = async (index: number) => {
    if (!paises) return;
    const id = filteredData[index].id

    try{
      const response = await handleGetPaisById(id);
      
      setSelectedItem(response?.data);
      setIsOpenSideModal(true);
    } catch (error)  {
      console.log("Erro ao buscar continente", error)
    }
  }

  const handleGetPaisById = async (id: number) => {
    try {
      const pais = await api.get(`pais/${id}`);
      return pais;
    } catch (error) {
      console.log("erro ao encontrar pais", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const request = api.delete(`pais/${id}`);
      await toast.promise(
        request, {
          loading:  "Deletando pais...",
          success: "Pais deletado com sucesso!",
          error: "Erro ao deletar pais.",
        }
      )
      refetch();
    } catch (error) {
      console.log("Erro ao excluir pais", error)
    }
  }

  const handleSubmit = async (data: PaisFormData) => {
    try {
      const request = selectedItem 
      ? api.put(`pais/${selectedItem.id}`, data)
      : api.post('pais', data);

      await toast.promise (
        request, {
          loading: selectedItem ? "Atualizando país..." : "Criando país...",
          success: selectedItem ? "País atualizado com sucesso!" : "País criado com sucesso!",
          error: "Erro ao salvar país.",
        }
      );
      refetch();
      setIsOpenCenterModal(false);
    } catch (error) {
      console.error("Erro ao salvar pais:", error);
    }
  }

const filtersJSX = (
    <>
      <select
        value={continenteIdFilter}
        onChange={(e) => setContinenteIdFilter(e.target.value)}
        className="px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm w-full sm:w-auto"
      >
        <option value="">Todos os Continentes</option>
        {(continentes as ContinenteType[] || []).map((cont) => (
          <option key={cont.id} value={String(cont.id)}>
            {cont.nome}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Pop. Mínima"
        value={populacaoMinFilter}
        onChange={(e) => setPopulacaoMinFilter(e.target.value)}
        className="px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition text-sm w-full sm:w-36"
      />
      <input
        type="number"
        placeholder="Pop. Máxima"
        value={populacaoMaxFilter}
        onChange={(e) => setPopulacaoMaxFilter(e.target.value)}
        className="px-3 py-2 rounded-lg border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition text-sm w-full sm:w-36"
      />
    </>
  );

  const columns = ["Nome", "Sigla", "População", "Idioma", "Ações"];
  const rows =
    filteredData?.map((pais) => [
      <div className="flex items-center gap-3">
        <img
          src={`https://flagcdn.com/w40/${pais.sigla.toLowerCase()}.png`}
          alt={pais.nome}
          className="w-6 h-6 rounded-full object-cover border border-border"
        />
        <span>{pais.nome}</span>
      </div>,
      pais.sigla,
      pais.populacao,
      pais.idiomaOficial,
      <Actions
        pais={pais}
        onEdit={(p) => {
          setSelectedItem(p);
          setIsOpenCenterModal(true);
        }}
        onDelete={handleDelete}
      />,
    ]) || [];
  return (
    <div className="w-full">
        <div className="p-7 flex flex-col border-b border-border space-y-3">
            <div className='flex items-center space-x-4'>
                <i className='fa-solid fa-flag-usa fa-2xl'></i>
                <h1 className="text-text-primary font-semibold text-4xl">Países</h1>
            </div>
            <p className='text-text-secondary'>Gerencie, adicione e visualize informações sobre países cadastrados</p>
        </div>

        <div className="p-5">
          <FilterBar
              searchPlaceholder="Buscar país..."
              onSearchChange={(value) => setSearch(value)}
              onAdd={() => {
                setSelectedItem(null);
                setIsOpenCenterModal(true);
              }}
              addLabel="Novo País"
              filters={filtersJSX}
          />
          <div className="flex w-full py-5 items-center justify-center">
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <DataTable columns={columns} rows={rows} onRowClick={handleRowClick}/>}
          </div>
        </div>

        <SideModal isOpen={isOpenSideModal} onClose={() => setIsOpenSideModal(false)} title={`Detalhes do País ${selectedItem?.nome}`}>
          {selectedItem && (
            <div className="space-y-2">
              <p><strong>Bandeira </strong></p>
              <div className='border border-border rounded-lg'>
                <img src={`https://flagcdn.com/w1280/${selectedItem.sigla.toLowerCase()}.png`} className='w-full max-h-90 rounded-lg' alt="" />
              </div>
              <p><strong>Nome:</strong> {selectedItem.nome}</p>
              <p><strong>Sigla:</strong> {selectedItem.sigla}</p>
              <p><strong>População:</strong> {selectedItem.populacao}</p>
              <p><strong>Idioma:</strong> {selectedItem.idiomaOficial}</p>
              <p><strong>Moeda:</strong> {selectedItem.moeda}</p>
              <div className="mt-5">
                <h3 className="font-semibold text-lg mb-2">Cidades:</h3>
                {selectedItem.cidades && selectedItem.cidades.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto rounded-md border border-border">
                    <table className="w-full text-sm border-collapse">
                      <thead className="sticky top-0 bg-surface z-10">
                        <tr className="text-left border-b border-border">
                          <th className="p-2 font-medium">Nome</th>
                          <th className="p-2 font-medium">População</th>
                          <th className="p-2 font-medium">Lat</th>
                          <th className="p-2 font-medium">Lon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.cidades.map((cidade) => (
                          <tr key={cidade.id} className="border-t border-border hover:bg-hover transition">
                            <td className="p-2">{cidade.nome}</td>
                            <td className="p-2">{cidade.populacao}</td>
                            <td className="p-2">{cidade.latitude}</td>
                            <td className="p-2">{cidade.longitude}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-text-secondary">Nenhuma Cidade cadastrado</p>
                )}
              </div>
            </div>
          )}
        </SideModal>

        <PaisFormModal
          isOpen={isOpenCenterModal}
          onClose={() => setIsOpenCenterModal(false)}
          pais={selectedItem || undefined}
          onSubmit={handleSubmit}
        />          

    </div>
  )
}

const Actions = ({ pais, onEdit, onDelete }: { pais: PaisType; onEdit: (pais: PaisType) => void; onDelete: (id: number) => void }) => (
  <div className="flex gap-3 text-primary">
    <i className="fa-solid fa-pen cursor-pointer hover:text-primary-hover"
      onClick={(e) => { e.stopPropagation(); onEdit(pais); }}
    ></i>
    <i className="fa-solid fa-trash cursor-pointer text-red-500 hover:text-red-400"
      onClick={(e) => {e.stopPropagation(); onDelete(pais.id)} }
    ></i>
  </div>
);

export default Pais