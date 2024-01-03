import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataProvider from './context/DataContext'

import Home from './pages/Home/Home'
import Layout from './pages/Layout'

const App = () => {


  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            {/* <Route path="/ruta" element={</Componente>}></Routes> */}
              
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>


  )
}

export default App
