import { NavLink } from "react-router-dom"
import ClimaCard from "../components/ClimaCard"; 
import { useFetchData } from "../hooks/useFetchData";
import type { CidadeType } from "../types/CidadeType";
import { useEffect, useState } from "react";
import { useClima } from "../hooks/useClima";

interface GeoStats {
    totalContinents: number;
    totalCountries: number;
    totalCities: number;
}

const KPICard = ({ title, value, icon }: { title: string, value: string | number, icon: string }) => (
    <div className="p-6 flex flex-col justify-center rounded-xl shadow-md bg-card-background border border-border transition-colors duration-300 md:items-start">
        <i className={`fa-solid ${icon} text-2xl text-primary mb-3`}></i>
        <p className="text-3xl font-bold text-text-primary mb-1">{value}</p>
        <h2 className="text-lg font-semibold text-text-secondary">{title}</h2>
    </div>
);

const CardSeeMore = ({to, icon, title, description, className = ''}: {to: string, icon: string, title: string, description: string, className?: string}) => (
  <div className={`p-8 flex flex-col justify-between rounded-xl shadow-md bg-card-background border border-border transition-colors duration-300 ${className}`}>
    <i className={`fa-solid ${icon} text-3xl text-primary mb-4`}></i>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-text-secondary">{description}</p>
    <div className="mt-4">
      <NavLink 
        to={to} 
        className={'inline-flex items-center justify-center border border-primary hover:gradient-dynamic hover:border-transparent text-primary hover:text-white rounded-lg px-3 py-2 text-sm transition-colors duration-200 w-full'}
      >
        <p>Ver {title.includes("Adicionar") ? "Ação" : title}</p>
      </NavLink>
    </div>
  </div>
)

const Dashboard = () => {
  const { data: rawData } = useFetchData("dashboard/stats");
  const geoStatsData = Array.isArray(rawData) ? null : (rawData as GeoStats);

  const geoStats: GeoStats = {
      totalContinents: geoStatsData?.totalContinents ?? 0,
      totalCountries: geoStatsData?.totalCountries ?? 0,
      totalCities: geoStatsData?.totalCities ?? 0,
  };

  const { data: rawCitiesData } = useFetchData("cidade");
  const cidadesList = rawCitiesData as CidadeType[] || []; 

  const [selectedCityId, setSelectedCityId] = useState<number | null>(() => {
      const storedId = localStorage.getItem('featuredCityId');
      return storedId ? Number(storedId) : null;
  });

  const { clima, loadingClima, errorClima } = useClima(selectedCityId);

  useEffect(() => {
      if (selectedCityId && selectedCityId > 0) {
          localStorage.setItem('featuredCityId', String(selectedCityId));
      } else {
          localStorage.removeItem('featuredCityId');
      }
  }, [selectedCityId]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = Number(e.target.value);
      setSelectedCityId(id > 0 ? id : null);
  };

  return (
    <div className="w-full">
      <section className="p-3 md:p-14 text-center border-b border-border shadow-inner">
        <div className="py-10">
          <div className="flex py-5 justify-center items-center space-x-4 mb-4">
            <i className="fa-solid fa-map fa-3x md:fa-5x bg-linear-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"></i>
            <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary">
              GeoSync
            </h1>
          </div>
        
          <p className="text-xl md:text-3xl font-semibold text-text-primary max-w-2xl mx-auto mb-10">
              Seu Painel de Geoinformação em Tempo Real.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <KPICard title="Continentes" value={geoStats.totalContinents} icon="fa-earth-americas" />
          <KPICard title="Países" value={geoStats.totalCountries} icon="fa-flag-usa" />
          <KPICard title="Cidades" value={geoStats.totalCities} icon="fa-city" />
        </div>
        
      </section>

      <div className="p-5 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="w-full">
          <h2 className="text-text-primary font-semibold text-2xl mb-4">Clima Cidade</h2>
          <div className="rounded-xl shadow-md border border-border p-5 bg-card-background">
              <label htmlFor="featured-city-select" className="block text-sm font-medium mb-2">Escolha a Cidade em Destaque:</label>
              <select
                  id="featured-city-select"
                  value={selectedCityId ?? 0}
                  onChange={handleCityChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm mb-4"
              >
                  <option value={0}>Selecione uma cidade...</option>
                  {cidadesList.map((cidade) => (
                      <option key={cidade.id} value={cidade.id}>
                          {cidade.nome} (ID: {cidade.id})
                      </option>
                  ))}
              </select>

              <h3 className="text-lg font-medium mb-3 text-primary">Previsão em Tempo Real</h3>
              
              {loadingClima && <p>Carregando clima...</p>}
              {errorClima && <p className="text-red-500">{errorClima}</p>}
              
              {clima ? (
                  <ClimaCard 
                      icone_url={clima.icone_url} 
                      descricao={clima.descricao} 
                      temperatura_c={String(clima.temperatura_c)} 
                      localidade={clima.localidade} 
                      hora_local={clima.hora_local} 
                      umidade_perc={String(clima.umidade_perc)} 
                      vento_kph={String(clima.vento_kph)} 
                      sensacao_termica_c={String(clima.sensacao_termica_c)}
                  />
              ) : (
                  <p className="text-text-secondary">Selecione uma cidade para ver o clima em destaque.</p>
              )}
              
              <p className="text-sm text-text-secondary mt-3">
                  Integração com WeatherAPI.
              </p>
          </div>
        </div>

        <div className="w-full">
            <h2 className="text-text-primary font-semibold text-2xl mb-4">Gestão Rápida</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 gap-4">
                <CardSeeMore to="/continente" title="Gerenciar Continentes" icon="fa-earth-americas" description="Criar, editar e listar continentes."/>
                <CardSeeMore to="/pais" title="Gerenciar Países" icon="fa-flag-usa" description="Adicionar países e ver detalhes geográficos."/>
                <CardSeeMore to="/cidade" title="Gerenciar Cidades" icon="fa-city" description="Associar cidades e checar o clima."/>
                <CardSeeMore to="/bandeiras" title="Galeria de Bandeiras" icon="fa-flag" description="Explore as bandeiras dos países cadastrados."/>
            </div>
        </div>
      </div>
      
      <div className="p-10 text-center text-text-secondary border-t border-border mt-10">
        <p>GeoSync Dashboard © 2024</p>
      </div>
    </div>
  )
}

export default Dashboard