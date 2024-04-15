import { useEffect, useState } from 'react'; // Importamos los hooks necesarios de React
import './modificar.css' // Importamos los estilos del componente

export const Modificar = () => { // Definimos el componente Modificar
  const [email, setEmail] = useState(''); // Definimos el estado para el email
  const [usuario, setUsuario] = useState(null); // Definimos el estado para el usuario
  const [isLoading, setIsLoading] = useState(false); // Definimos el estado para si está cargando
  const [isEditing, setIsEditing] = useState(false); // Definimos el estado para si está editando

  let url = import.meta.env.VITE_APP_URL || 'http://localhost:3232'; // Definimos la URL de la API

  const buscarUsuario = async (e) => { // Función para buscar un usuario
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    setIsLoading(true); // Establecemos que está cargando
    const response = await fetch(`${url}/inicio`); // Hacemos una petición a la API
    const data = await response.json(); // Convertimos la respuesta a JSON
    const usuarioEncontrado = data.find(user => user.email === email); // Buscamos el usuario con el email ingresado
    setUsuario(usuarioEncontrado); // Establecemos el usuario encontrado
    setIsLoading(false); // Establecemos que ya no está cargando
  }

  const manejCambioInput = (e) => { // Función para manejar el cambio en los inputs
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value // Actualizamos el valor del campo que cambió
    });
  }

  const iniciarEdicion = () => { // Función para iniciar la edición
    setIsEditing(true); // Establecemos que está editando
  }

  const guardarCambios = async () => { // Función para guardar los cambios
    try {
      const response = await fetch(`${url}/id`, { // Hacemos una petición a la API
        method: 'PUT', // Usamos el método PUT para actualizar
        headers: {
          'Content-Type': 'application/json' // Indicamos que el contenido es JSON
        },
        body: JSON.stringify(usuario) // Convertimos el usuario a JSON
      });

      if (!response.ok) { // Si la respuesta no es ok
        throw new Error('Error al guardar los cambios'); // Lanzamos un error
      }

      const data = await response.json(); // Convertimos la respuesta a JSON
      console.log('Usuario modificado', data); // Mostramos en consola el usuario modificado
      setIsEditing(false); // Establecemos que ya no está editando
    } catch (error) { // Si hay un error
      console.error(error); // Mostramos el error en consola
    }
  }

  return ( // Retornamos el JSX del componente
    <main className='Modificar-main'>
      <div>
        <h4>Email del usuario a modificar</h4>
        <form onSubmit={buscarUsuario}>
          <label htmlFor="email">Email:</label>
          <span>
            <input type="text" placeholder='Ingrese aqui el Email' onChange={e => setEmail(e.target.value.trim().replace(/\s/g, ''))} />
            <button type="submit">Buscar</button>
          </span>
        </form>
        {isLoading && <p>Buscando usuario...</p>}
        {usuario && !isEditing && (
          <div>
            <h4>Usuario con ID: {usuario._id}</h4>
            <button onClick={iniciarEdicion} className='modificarUs'>Modificar</button>
          </div>
        )}
        {usuario && isEditing && (
          <div>
            <h4>Modificar usuario con ID: {usuario._id}</h4>
            <form onSubmit={guardarCambios}>
              <label>Nombre:</label>
              <input type="text" name="nombre" value={usuario.nombre} onChange={manejCambioInput} />
              <label>Apellido:</label>
              <input type="text" name="apellido" value={usuario.apellido} onChange={manejCambioInput} />
              <label>Email:</label>
              <input type="text" name="email" value={usuario.email} onChange={manejCambioInput} />
              <label>Teléfono:</label>
              <input type="text" name="telefono" value={usuario.telefono} onChange={manejCambioInput} />
              <button type="submit">Guardar cambios</button>
            </form>
          </div>
        )}
      </div>
    </main>
  )
}