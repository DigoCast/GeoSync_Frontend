import { useState } from "react";
import FlagCard from "../components/FlagCard";
import { useFetchData } from "../hooks/useFetchData";
import SideModal from "../components/SideModal";
import type { PaisType } from "../types/PaisType";

const Bandeiras = () => {
  const { data: paises, loading, error } = useFetchData("pais");
  const [selectedPais, setSelectedPais] = useState<PaisType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (pais: PaisType) => {
    setSelectedPais(pais);
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      <div className="p-7 flex flex-col border-b border-border space-y-2">
        <h2 className="text-text-primary font-semibold text-4xl">Bandeiras</h2>
        <p className="text-text-secondary">
          Visualize as bandeiras e informações dos países cadastrados
        </p>
      </div>

      <div className="m-7">
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && paises && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {paises.map((pais) => (
              <FlagCard
                key={pais.id}
                nome={pais.nome}
                sigla={pais.sigla}
                onClick={() => handleOpenModal(pais)}
              />
            ))}
          </div>
        )}
      </div>

      <SideModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Detalhes de ${selectedPais?.nome}`}
      >
        {selectedPais && (
          <div className="space-y-2">
            <img
              src={`https://flagcdn.com/w320/${selectedPais.sigla.toLowerCase()}.png`}
              alt={selectedPais.nome}
              className="rounded-lg mb-3 border border-border w-full"
            />
            <p><strong>Nome:</strong> {selectedPais.nome}</p>
            <p><strong>Sigla:</strong> {selectedPais.sigla}</p>
            <p><strong>População:</strong> {selectedPais.populacao}</p>
            <p><strong>Idioma:</strong> {selectedPais.idiomaOficial}</p>
            <p><strong>Moeda:</strong> {selectedPais.moeda}</p>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default Bandeiras;
