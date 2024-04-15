import './header.css'
import {useNavigate, useLocation} from 'react-router-dom'

export const Header = () => {
  const url = useNavigate()
  const location = useLocation()

  return (
    <header>
        <ul>
          <li onClick={() => url('/')} className={location.pathname === '/' ? 'active' : ''}>LOGO</li>
          <li onClick={() => url('/')} className={location.pathname === '/' ? 'active' : ''}>Inicio</li>
          <li onClick={() => url('/registrar')} className={location.pathname === '/registrar' ? 'active' : ''}>Registrar</li>
          <li onClick={() => url('/modificar')} className={location.pathname === '/modificar' ? 'active' : ''}>Modificar</li>
          <li onClick={() => url('/eliminar')} className={location.pathname === '/eliminar' ? 'active' : ''}>Eliminar</li>
        </ul>
    </header>
  )
}
