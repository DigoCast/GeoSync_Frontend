import DataTable from "../components/DataTable";
import { FilterBar } from "../components/FilterBar";
import { useFetchData } from "../hooks/useFetchData";
import { api } from "../services/api";

const Continente = () => {
  const { data: continentes, loading, error, refetch } = useFetchData("continente");

  const handleAdd = async () => {
    try {
      await api.post("continente", { nome: "Novo Continente", descricao: "Exemplo" })
      refetch();
    } catch (error) {
      console.log("Erro ao criar continente", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`continente/${id}`);
      refetch();
    } catch (error) {
      console.error("Erro ao deletar continente", error);
    }
  };

  const columns = ["Nome", "Descrição", "Ações"];
  const rows = continentes?.map((conti) => [conti.nome, conti.descricao, <Actions id={conti.id} onDelete={handleDelete} />]) || [];

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
          onAdd={handleAdd}
          addLabel="Novo Continente"
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

export default Continente;