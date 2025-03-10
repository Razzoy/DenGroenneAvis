import style from "./MainLayout.module.scss";
import { UserContextProvider } from "../context/userContext";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Wrapper } from "../components/Wrapper/Wrapper";

export function MainLayout() {
  return (
    <div className={style.mainLayoutStyle}>
      <Header />
      <Wrapper>
        {/* Everything in UserContextProvider will be changeable depending on if logged in or not */}
        <UserContextProvider>
          <Outlet />
        </UserContextProvider>
      </Wrapper>
      <Footer />
    </div>
  );
}
