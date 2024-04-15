import './App.css'
import { Eliminar } from './Eliminar'
import { Inicio } from './Inicio'
import { Modificar } from './Modificar'
import { Registrar } from './Registrar'
import { Header } from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Inicio/>}></Route>
          <Route path='/registrar' element={<Registrar/>}></Route>
          <Route path='/modificar' element={<Modificar/>}></Route>
          <Route path='/eliminar' element={<Eliminar/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App