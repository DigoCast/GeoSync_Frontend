interface FlagCardProps {
  nome: string;
  sigla: string;
  onClick?: () => void;
}

const FlagCard = ({ nome, sigla, onClick }: FlagCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-card-background rounded-xl w-full overflow-hidden shadow-md border border-border transition-transform duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        src={`https://flagcdn.com/w320/${sigla.toLowerCase()}.png`}
        className="w-full h-40 object-cover border-b border-border"
        alt={`Bandeira de ${nome}`}
        loading="lazy"
      />
      <div className="p-3 flex flex-col items-center text-center">
        <h2 className="text-text-primary font-medium text-lg mb-2">{nome}</h2>
        <button className="border border-primary hover:gradient-dynamic hover:border-transparent hover:cursor-pointer text-primary hover:text-white rounded-lg px-3 py-1 text-sm transition-colors duration-200">
          Ver País
        </button>
      </div>
    </div>
  );
};

export default FlagCard;
