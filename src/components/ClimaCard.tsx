interface ClimaCardProps {
    icone_url: string,
    descricao: string,
    temperatura_c: string,
    localidade: string,
    hora_local: string,
    umidade_perc: string,
    vento_kph: string,
    sensacao_termica_c: string
}

const ClimaCard = ({icone_url, descricao, temperatura_c, localidade, hora_local, umidade_perc, vento_kph, sensacao_termica_c}: ClimaCardProps) => {
  return (
    <div className="gradient-dynamic text-white p-5 rounded-xl shadow-lg flex flex-col gap-3 transition-all duration-300 ">
        <div className="flex items-center gap-4">
        <img src={icone_url} alt={descricao} className="w-16 h-16 drop-shadow-md" />
        <div>
            <p className="text-4xl font-bold leading-tight">{temperatura_c}°C</p>
            <p className="text-sm opacity-90">{descricao}</p>
        </div>
        </div>
        <div className="text-sm opacity-90">
        <p className="font-medium">{localidade}</p>
        <p className="text-xs">Atualizado: {hora_local}</p>
        </div>

        <div className="grid grid-cols-3 text-center text-sm mt-3 border-t border-white/20 pt-3">
        <div>
            <p className="font-semibold">{umidade_perc}%</p>
            <p className="text-xs opacity-80">Umidade</p>
        </div>
        <div>
            <p className="font-semibold">{vento_kph} km/h</p>
            <p className="text-xs opacity-80">Vento</p>
        </div>
        <div>
            <p className="font-semibold">{sensacao_termica_c}°C</p>
            <p className="text-xs opacity-80">Sensação</p>
        </div>
        </div>
    </div>
  )
}

export default ClimaCard