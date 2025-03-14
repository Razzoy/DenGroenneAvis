import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './assets/layout/MainLayout'
import { FrontPage } from './assets/pages/FrontPage'
import { ListingPage } from './assets/pages/ListingPage'
import { NoPage } from './assets/pages/NoPage'
import { CategoryPage } from './assets/pages/CategoryPage'
import { ProductPage } from './assets/pages/ProductPage'
import { LoginPage } from './assets/pages/LoginPage'
import { ProfilePage } from './assets/pages/ProfilePage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainLayout/>} >
        <Route index={true} element={<FrontPage/>}/>
        <Route path={"/login"} element={<LoginPage/>} />
        <Route path={"/products/:slug"} element={<ProductPage/>} />
        <Route path={"/products/category/:slug"} element={<CategoryPage/>} />
        <Route path={"/listing"} element={<ListingPage/>} />
        <Route path={"/profile"} element={<ProfilePage/>} />
        <Route path={"/*"} element={<NoPage/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
