import { FilterBar } from '../components/FilterBar'
import { useFetchData } from '../hooks/useFetchData'
import DataTable from '../components/DataTable'
import { api } from '../services/api'

const Pais = () => {
  const { data: paises, loading, error, refetch} = useFetchData("pais")

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`pais/${id}`);
      refetch();
    } catch (error) {
      console.log("Erro ao excluir pais", error)
    }
  }

  const columns = ["Nome", "Sigla", "População", "Idioma", "Ações"];
  const rows = paises?.map((pais) => [pais.nome, pais.sigla, pais.populacao, pais.idiomaOficial, <Actions id={pais.id} onDelete={handleDelete}/>])
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
            onAdd={() => console.log("Novo país")}
            addLabel="Novo País"
        />
        <div className="flex w-full py-5 items-center justify-center">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <DataTable columns={columns} rows={rows} />}
        </div>
        </div>
    </div>
  )
}

const Actions = ({ id, onDelete }: { id: number; onDelete: (id: number) => void }) => (
  <div className="flex gap-3 text-primary">
    <i className="fa-solid fa-pen cursor-pointer hover:text-purple-600"></i>
    <i
      className="fa-solid fa-trash cursor-pointer text-red-500 hover:text-red-400"
      onClick={() => onDelete(id)}
    ></i>
  </div>
);

export default Pais