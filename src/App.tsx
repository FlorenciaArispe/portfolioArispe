import CurveDivider from "./components/CurveDivider"
import { Header } from "./components/Header"
import Presentation from "./components/Presentation"
import ScrollDownArrow from "./components/ScrollDownArrow"

function App() {
  return (
    <>
      <Header />

      {/* Sección 1 ajustada con altura automática */}
      <section className="relative h-screen flex flex-col justify-center items-center">
        {/* Centro de la presentación vertical y horizontal */}
        <Presentation />

        <ScrollDownArrow />
        <CurveDivider />
      </section>

      {/* Sección 2 más arriba sin tanto espacio blanco */}
      <section className="bg-[#6F5156] h-screen flex justify-center items-center text-white">
        <h2 className="text-4xl font-bold">Siguiente Sección</h2>
      </section>
    </>
  )
}

export default App
