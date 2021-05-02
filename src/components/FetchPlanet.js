import { useState, useEffect } from 'react'

const FetchPlanet = (props) => {
  const { page, setPreviousPage } = props
  const [planetsList, setPlanetsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let url = `https://swapi.dev/api/planets/?page=${page}`

    setLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Quelque chose n'a pas marché, status ${response.status}`
          )
        }
        return response.json()
      })
      .then((data) => {
        setPlanetsList(planetsList => [...planetsList, ...data.results])
        data.next === null ? setPreviousPage(false) : setPreviousPage(true)
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        setLoading(false)
      })
    return () => {
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [page])
  return (
    <>
      <h1 className="mb-5">Planets in Star Wars universe</h1>
      <div className="row">
        {planetsList.map((planet) => {
          return (
            <div key={planet.name} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="bg-warning p-3">
                <h2 className="h5">{planet.name}</h2>
                <p className="mb-0">
                  <b>population</b> <br /> {planet.population}
                </p>
                <p className="mb-0">
                  <b>climat</b> <br /> {planet.climate}
                </p>
              </article>
            </div>
          );
        })}
        {loading && (
          <div className="mb-4 text-center p-3">loading...</div>
        )}
      </div>
    </>
  )
}

export default FetchPlanet