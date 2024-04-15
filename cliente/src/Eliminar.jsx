import { useState } from "react";
import alerta from 'sweetalert2'

export const Eliminar = () => {
  const [email, setEmail] = useState('');

  const manejEliminar = async (e) => {
      e.preventDefault();
      let url = import.meta.env.VITE_APP_URL || 'http://localhost:3232';
      try {
          const response = await fetch(`${url}/eliminar`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.error);
          }
          alerta.fire('Eliminado', 'El usuario se ha eliminado correctamente');
      } catch (error) {
          console.log('Error al eliminar el usuario');
          alerta.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al eliminar el usuario!",
          });
          console.log(error);
      }
  };

  return (
      <main className='Modificar-main'>
          <div>
              <h4>Email del usuario a eliminar</h4>
              <form onSubmit={manejEliminar}>
                  <label htmlFor="email">Email:</label>
                  <span>
                      <input type="text" placeholder='Ingrese aqui el Email' onChange={(e) => setEmail(e.target.value.trim().replace(/\s/g, ''))} />
                      <button type="submit">Eliminar</button>
                  </span>
              </form>
          </div>
      </main>
  )
}
