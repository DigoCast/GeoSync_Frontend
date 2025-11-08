import { FilterBar } from '../components/FilterBar'
import { useFetchData } from '../hooks/useFetchData'
import DataTable from '../components/DataTable';
import { api } from '../services/api';

const Cidade = () => {
  const { data: cidades, loading, error, refetch } = useFetchData("cidade");

  const handleAdd = async () => {
    try{
      await api.post("cidade", {nome: "Sao Paulo", populacao: 12301, paisId: 7});
      refetch();
    }catch(error){
      console.log("erro ao criar cidade", error)
    }
  }
  
  
  const handleDelete = async(id: number) => {
    try {
      await api.delete(`cidade/${id}`);
      refetch()
    } catch (error) {
      console.log("erro ao deletar cidade", error)
    }
  }

  const columns = ["Nome", "População", "Lat", "Lon", "Ações"]
  const rows = cidades?.map((cid) => [cid.nome, cid.populacao, cid.latitude, cid.longitude, <Actions id={cid.id} onDelete={handleDelete}/>])
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
              onAdd={handleAdd}
              addLabel="Nova Cidade"
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

export default Cidade