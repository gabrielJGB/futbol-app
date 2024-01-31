import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataProvider from './context/DataContext'
import LeaguesMenu from './components/LeaguesMenu/LeaguesMenu'

import Home from './pages/Home/Home'
import Layout from './pages/Layout'
import League from './pages/League/League'
import Match from './pages/Match/Match'

const App = () => {
  



  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="/league/:league_code" element={<League />} />
            <Route path="/match/:id" element={<Match />} />
              
          </Route>
        </Routes>
<LeaguesMenu />
      </BrowserRouter>
      
    </DataProvider>


  )
}

export default App
