import FetchPlanet from "./components/FetchPlanet"
import { useState } from 'react'

function App() {
  const [page, setPage] = useState(1)
  const [previousPage, setPreviousPage] = useState(false)
  const handleNext = () => {
    setPage(page + 1)
    setPreviousPage(previousPage)
  }

  return (
    <div>
      <div className="container py-4">
        <FetchPlanet page={page} setPage={setPage} previousPage={previousPage} setPreviousPage={setPreviousPage} />
        <button disabled={previousPage === false} onClick={handleNext} className="btn btn-dark my-2 me-2">{previousPage ? "Suivantes" : "Nous avons listé toutes les planètes"}</button>
      </div>
    </div>
  )
}

export default App;