import { useEffect, useState } from "react"
import './inicio.css'

export const Inicio = () => {
  const [data, setData] = useState([])

  let url = import.meta.env.VITE_APP_URL || 'http://localhost:3232';

  useEffect(() => {
    fetch(`${url}/inicio`)
    .then(convData => convData.json())
    .then(datos => setData(datos))
  }, []);
  return (
    <main className="inicio-main">
      <h1>Usuarios registrados</h1><br />
      <div className="divs">
        {data ? (
          <table className="inicio-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre(s)</th>
                <th>Apellido(s)</th>
                <th>Email</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, indice) => (
                <tr key={indice}>
                  <td>{`${indice + 1}`}</td>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.email}</td>
                  <td>{item.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          'Cargando...'
        )}
      </div>
    </main>
  );  
}
