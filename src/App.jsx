import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './assets/layout/MainLayout'
import { FrontPage } from './assets/pages/FrontPage'
import { ListingPage } from './assets/pages/ListingPage'
import { NoPage } from './assets/pages/NoPage'
import { ProductDetailsPage } from './assets/pages/ProductDetailsPage'
import { ProductPage } from './assets/pages/ProductPage'
import LoginPage from './assets/pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout/>} >
        <Route index={true} element={<FrontPage/>}/>
        <Route path={"/listing"} element={<ListingPage/>} />
        <Route path={"/login"} element={<LoginPage/>} />
        <Route path={"/products"} element={<ProductPage/>} />
        <Route path={"/products/:id"} element={<ProductDetailsPage/>} />
        <Route path={"/*"} element={<NoPage/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
