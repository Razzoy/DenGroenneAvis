import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './assets/layout/MainLayout'
import { FrontPage } from './assets/pages/FrontPage'
import { ListingPage } from './assets/pages/ListingPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout/>} >
        <Route index={true} element={<FrontPage/>}/>
        <Route path={"/listing"} element={<ListingPage/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
