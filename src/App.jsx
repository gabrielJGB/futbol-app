import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataProvider from './context/DataContext'

import Home from './pages/Home/Home'

import Layout from './pages/Layout'
import Match from './pages/Match/Match'

const App = () => {


  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="/match" element={<Match />} />
              
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>


  )
}

export default App
