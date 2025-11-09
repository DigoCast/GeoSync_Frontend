import { NavLink } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="p-7 flex items-center border-b border-border">
        <h1 className="text-text-primary font-semibold text-4xl">Dashboard</h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
        <CardSeeMore to="/continente" title="Continentes" icon="fa-earth-americas" description="Gerencie os continentes cadastrados."/>
        <CardSeeMore to="/pais" title="Países" icon="fa-flag-usa" description="Veja e edite os países disponíveis."/>
        <CardSeeMore to="/cidade" title="Cidades" icon="fa-city" description="Gerencie as cidades e veja o clima atual."/>
      </section>
    </div>
  )
}

const CardSeeMore = ({to, icon, title, description}: {to: string, icon: string, title: string, description: string}) => (
  <div className="p-6 flex flex-col  justify-between rounded-xl shadow-md bg-card-background border border-border transition-colors duration-300">
    <i className={`fa-solid ${icon} text-3xl text-primary mb-4`}></i>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-text-secondary">{description}</p>
    <div className="mt-2 p-2 border border-primary hover:gradient-dynamic hover:border-transparent rounded-lg w-2/6 min-w-20">
      <NavLink to={to} className={'flex items-center justify-center'}>
        <p>Ver {title}</p>
      </NavLink>
    </div>
  </div>
)

export default Dashboard