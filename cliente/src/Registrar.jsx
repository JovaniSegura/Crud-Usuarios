import React, { useState } from 'react'
import './Registrar.css'
import axios from 'axios'
import alerta from 'sweetalert2'

export const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')

    const manejFormu = async (e) => {
        e.preventDefault()
        let persona = {nombre,apellido,email,telefono}
        let url = import.meta.env.VITE_APP_URL || 'http://localhost:3232';
        try{
            const usuarios = await axios.get(`${url}/inicio`)
            const emailExiste = usuarios.data.find(usuario => usuario.email === email)
            const telefExiste = usuarios.data.find(usuario => usuario.telefono === telefono)

            if(emailExiste && telefExiste){
                alerta.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El email y el telefono ya se encuentra registrado!",
                });
                return
            } else if (emailExiste){
                alerta.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Este email ya se encuentra registrado!",
                });
                return
            } else if (telefExiste){
                alerta.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Este telefono ya se encuentra registrado!",
                });
                return
            }

            
            await axios.post(`${url}/registrar`, persona)
            alerta.fire(`Felicidades, El usuario con email ${email} se ha guardado correctamente`)
        } catch(error){
            console.log('Error al Guardar en la base de datos')
            alerta.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al Guardar en la base de datos!",
            });
            console.log(error);
        }   
    }

    return (
      <main className='registrar-main'>
          <form onSubmit={manejFormu}>
              <div>
                  <label htmlFor="nombre">Nombre(s)</label>
                  <input required type="text" id='nombre'placeholder='Ingresa tu(s) nombre' onChange={(e)=>setNombre(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="apellido">Apellido(s)</label>
                  <input required type="text" id='apellido'placeholder='Ingresa tu(s) apellido' onChange={(e)=>setApellido(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="email">Email</label>
                  <input required type="email" id='email'placeholder='Correo electronico' onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="telefono">Telefono</label>
                  <input required type="tel" id='telefono'placeholder='Telefono Celular' onChange={(e)=>setTelefono(e.target.value)}/>
              </div>
              <button>Guardar</button>
          </form>
      </main>
    )
}
